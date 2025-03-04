import 'react';
import PropTypes from 'prop-types';
import Hotelcarditem from './Hotelcarditem';

function Hotels({ trip }) {
    return (
        <div>
            <h2 className='mt-10 font-extrabold text-2xl  lg:text-3xl mb-4 pb-5 text-amber-700 border-b-2 border-amber-500 '>
                Hotel Recommendation 🏨
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {trip?.tripData?.travelPlan?.hotelOptions?.map((hotel, index) => (
                    <Hotelcarditem key={index} hotel={hotel} />
                ))}
            </div>
        </div>
    );
}

Hotels.propTypes = {
    trip: PropTypes.shape({
        tripData: PropTypes.shape({
            travelPlan: PropTypes.shape({
                hotelOptions: PropTypes.arrayOf(
                    PropTypes.shape({
                        HotelAddress: PropTypes.string,
                        HotelName: PropTypes.string,
                        Price: PropTypes.string,
                        Rating: PropTypes.number,
                    })
                ),
            }),
        }),
    }),
};


export default Hotels;
