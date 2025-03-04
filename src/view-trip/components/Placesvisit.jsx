import 'react';
import Placecard from './placecard';
import PropTypes from 'prop-types';

function Placesvisit({ trip }) {
    return (
        <div>
            <h2 className='mt-20 font-extrabold text-2xl lg:text-3xl pb-5 text-amber-700 border-b-2 border-amber-500'>
                Places to visit 🌟
            </h2>

            <div className='grid gap-7'>
                {trip?.tripData?.travelPlan?.itinerary?.map((Place, index) => (
                    <div key={index}>
                        <h2 className='my-5 mb-6 text-lg font-bold text-md border-l-4 border-amber-500 shadow-md p-2 bg-gradient-to-r from-gray-100 to-gray-200'>
                            Day: {Place.day}
                        </h2>
                        <div className='gap-5 mt-3'>
                            {Place?.activities?.map((activity, activityIndex) => (
                                <div key={activityIndex} className='p-5 rounded-2xl -my-7'>
                                    <Placecard activity={activity} trip={trip} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



Placesvisit.propTypes = {
    trip: PropTypes.shape({
        tripData: PropTypes.shape({
            travelPlan: PropTypes.shape({
                itinerary: PropTypes.arrayOf(
                    PropTypes.shape({
                        day: PropTypes.oneOfType([
                            PropTypes.string,
                            PropTypes.number,
                        ]).isRequired, // Ensuring it's either a string or number
                        activities: PropTypes.arrayOf(
                            PropTypes.shape({
                                PlaceName: PropTypes.string.isRequired,
                                BestTimeToVisit: PropTypes.string,
                                PlaceDetails: PropTypes.string.isRequired,
                                TimeTravelEachLocation: PropTypes.string.isRequired,
                                TicketPricing: PropTypes.string.isRequired,
                                latitude: PropTypes.number,
                                longitude: PropTypes.number,
                            })
                        ),
                    })
                ),
            }),
        }),
    }),
};


export default Placesvisit;
