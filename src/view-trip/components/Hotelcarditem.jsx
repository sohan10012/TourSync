import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PHOTO_REF_URL, GetPlaceDetails } from '@/service/GlobalAPI';

function Hotelcarditem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  const GetPlacePhoto = useCallback(async () => {
    const data = {
      textQuery: hotel?.HotelName,
    };

    try {
      const result = await GetPlaceDetails(data);
      const photoName = result.data.places[0]?.photos[3]?.name;
      if (photoName) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(PhotoUrl);
      }
    } catch (err) {
      if (err.response && err.response.status === 429) {
        console.error('429 Error: Rate limit exceeded. Using placeholder image.');
      } else {
        console.error('Error:', err);
      }
      setPhotoUrl('/placeholder.webp');
    }
  }, [hotel]);

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel, GetPlacePhoto]);

  const handleError = () => {
    setPhotoUrl('/placeholder.webp');
  };

  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotel?.HotelName + ', ' + hotel?.HotelAddress)}
      target='_blank'
    >
      <div className='cursor-pointer hover:scale-105 transition-all border border-gray-300 rounded-xl p-4 shadow-md'>
        <div className="flex justify-center">
          <img
            src={photoUrl ? photoUrl : '/placeholder.webp'}
            className='rounded-xl h-52 w-4/5 md:h-60 md:w-full object-cover'
            alt="Hotel"
            onError={handleError}
          />
        </div>
        <div className='my-2 flex flex-col gap-2 text-center md:text-left'>
          <h2 className='font-medium'>🏨 {hotel?.HotelName}</h2>
          <h2 className='text-sm text-gray-600'>{hotel?.HotelAddress}</h2>
          <h2 className='font-semibold text-lg'>
            {(() => {
              const priceRange = hotel?.Price.match(/\$(\d+)\s-\s\$(\d+)/);
              if (priceRange) {
                const minPrice = parseFloat(priceRange[1]);
                const maxPrice = parseFloat(priceRange[2]);
                const conversionRate = 88; // USD to INR conversion rate
                const minPriceInRupees = (minPrice * conversionRate).toFixed(2);
                const maxPriceInRupees = (maxPrice * conversionRate).toFixed(2);
                return `💸 ₹${minPriceInRupees} - ₹${maxPriceInRupees}/night`;
              }
              return 'Invalid Price';
            })()}
          </h2>
          <h2 className='font-semibold'>Rating: {hotel?.Rating} 🌟</h2>
        </div>
      </div>
    </Link>
  );
}

Hotelcarditem.propTypes = {
  hotel: PropTypes.shape({
    HotelAddress: PropTypes.string.isRequired,
    HotelName: PropTypes.string.isRequired,
    Price: PropTypes.string.isRequired,
    Rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default Hotelcarditem;
