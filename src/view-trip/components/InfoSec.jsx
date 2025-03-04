import { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PiShareFat } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';

function InfoSec({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  const GetPlacePhoto = useCallback(async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
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
  }, [trip]);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip, GetPlacePhoto]);

  const handleError = () => {
    setPhotoUrl('/placeholder.webp');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Trip to ${trip?.userSelection?.location?.label}`,
        text: `I'm planning a trip to ${trip?.userSelection?.location?.label} for ${trip?.userSelection?.noofDays} days. Budget: ${trip?.userSelection?.budget}. Join me!`,
        url: window.location.href, // Share the current URL
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <>
      <div>
        <img className='h-[400px] object-cover rounded-2xl w-full' src={photoUrl} alt="Location" onError={handleError} />
      </div>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
        <div className='my-5 flex flex-col gap-2.5'>
          <h1 className='font-bold md:text-2xl lg:text-2xl xl:text-3xl sm:text-3xl mb-2.5'>{trip?.userSelection?.location?.label}</h1>
          <div className='flex flex-wrap gap-5'>
            <h2 className='p-1 bg-gray-200 text-gray-500 font-semibold px-3 rounded-full text-xs md:text-md'>📆{trip?.userSelection?.noofDays} Days</h2>
            <h2 className='p-1 bg-gray-200 text-gray-500 font-semibold px-3 rounded-full text-xs md:text-md'>💵{trip?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 bg-gray-200 text-gray-500 font-semibold px-3 rounded-full text-xs md:text-md'>🥂No of Traveller: {trip?.userSelection?.traveller} People</h2>
          </div>
        </div>
        <div className='my-5 sm:my-0 sm:ml-5'>
          <Button className='w-full cursor-pointer sm:w-auto' onClick={handleShare}>
            <PiShareFat />
          </Button>
        </div>
      </div>
    </>
  );
}

InfoSec.propTypes = {
  trip: PropTypes.shape({
    userSelection: PropTypes.shape({
      location: PropTypes.shape({
        label: PropTypes.string,
      }),
      noofDays: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      budget: PropTypes.string,
      traveller: PropTypes.number,
    }),
  }).isRequired,
};

export default InfoSec;
