import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PHOTO_REF_URL, GetPlaceDetails } from '@/service/GlobalAPI';
import { Link } from 'react-router-dom';

function UserTrip({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  const GetPlacePhoto = useCallback(async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
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
        console.error("429 Error: Rate limit exceeded. Using placeholder image.");
      } else {
        console.error("Error:", err);
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

  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='cursor-pointer hover:scale-105 transition-all border-2 border-gray-300 rounded-xl p-4 shadow-md'>
      <div className="flex justify-center">
        <img className='rounded-xl mt-5 h-60 w-3/4 md:h-60 md:w-60 lg:w-80 xl:w-70 object-cover' src={photoUrl ? photoUrl : '/placeholder.webp'} alt={trip.HotelName || "Trip"} onError={handleError} />
      </div>
      <div className='my-2 flex flex-col gap-2 text-center '>
        <p className='mt-1.5 font-bold sm:text-lg md:text-xl'>{trip?.tripData?.travelPlan?.destination}</p>
          <h2 className='text-gray-600 sm:text-sm md:text-md'>{trip?.tripData?.travelPlan?.duration} with {trip?.tripData?.travelPlan?.budget || trip?.tripData?.travelPlan?.focus } Budget</h2>
      </div>
    </div>
    </Link>
  );
}

UserTrip.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string.isRequired,
    PlaceName: PropTypes.string.isRequired,
    HotelImageUrl: PropTypes.string,
    HotelName: PropTypes.string,
    Description: PropTypes.string,
    userSelection: PropTypes.shape({
      location: PropTypes.shape({
        label: PropTypes.string,
      }),
    }),
    tripData: PropTypes.shape({
      travelPlan: PropTypes.shape({
        destination: PropTypes.string,
        duration: PropTypes.number,
        budget: PropTypes.number,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};


export default UserTrip;
