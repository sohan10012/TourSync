import { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { MdLocationPin } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { PHOTO_REF_URL, GetPlaceDetails } from '@/service/GlobalAPI';

function Placecard({ activity, trip }) {
    const [photoUrl, setPhotoUrl] = useState();

    const GetPlacePhoto = useCallback(async () => {
        const data = {
            textQuery: activity.PlaceName,
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
    }, [activity]);

    useEffect(() => {
        if (activity) {
            GetPlacePhoto();
        }
    }, [activity, GetPlacePhoto]);

    const handleError = () => {
        setPhotoUrl('/placeholder.webp');
    };

    return (
        <div className="w-full cursor-pointer hover:scale-105 transition-all p-3 border border-gray-300 rounded-lg box-border mb-5 shadow-md">
            <div className="flex flex-col items-center sm:items-center md:flex-row md:items-start gap-3">
                <div className="flex-shrink-0 sm:self-center">
                    <img
                        src={photoUrl ? photoUrl : '/placeholder.webp'}
                        className="h-[200px] mr-6 w-[250px] md:h-[180px] md:w-[200px] lg:h-[150px] lg:w-[200px] xl:h-[200px] xl:w-[250px] rounded-xl object-cover mx-auto"
                        alt="Place"
                        onError={handleError}
                    />
                </div>

                <div className="flex-1 min-w-0 text-center sm:text-center md:text-left">
                    <h2 className="font-bold text-lg">{activity.PlaceName}</h2>
                    <h2 className="font-medium my-2 text-orange-600">Visit {activity.BestTimeToVisit}</h2>
                    <p className="text-gray-500 text-sm">{activity.PlaceDetails}</p>
                    <p className="text-black font-medium text-md my-3">⏱️ {activity.TimeTravelEachLocation}</p>
                    <p className="font-medium text-md my-3">
                        <span className="font-light">Ticket Pricing: </span>{activity.TicketPricing}
                    </p>

                    <div className="flex justify-center md:justify-start gap-2">
                        <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(activity?.PlaceName + ',' + trip?.tripData?.travelPlan?.destination + ',lattitude: ' + activity?.latitude + ',longitude:' + activity?.longitude)} target='_blank'>
                            <Button size="sm" className="flex cursor-pointer items-center gap-1">
                                <MdLocationPin />
                                View Location
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

Placecard.propTypes = {
    activity: PropTypes.shape({
        PlaceName: PropTypes.string.isRequired,
        BestTimeToVisit: PropTypes.string,
        PlaceDetails: PropTypes.string.isRequired,
        TimeTravelEachLocation: PropTypes.string.isRequired,
        TicketPricing: PropTypes.string.isRequired,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
    }).isRequired,
    trip: PropTypes.shape({
        tripData: PropTypes.shape({
            travelPlan: PropTypes.shape({
                destination: PropTypes.string,
            }).isRequired,
        }).isRequired,
    }).isRequired,
};

export default Placecard;
