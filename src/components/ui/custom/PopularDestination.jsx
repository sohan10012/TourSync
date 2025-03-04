import 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';

/**
 * @typedef {Object} Destination
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @property {number} rating
 */

/** @type {Destination[]} */
const destinations = [
    {
        id: 1,
        name: 'Hampi, Karnataka',
        description: 'Hampi, a UNESCO World Heritage Site, is known for its ancient temples, ruins, and stunning landscapes. It was once the capital of the Vijayanagara Empire and is now a historical delight for travelers.',
        image: 'https://www.holidaymonk.com/wp-content/uploads/2020/10/Vastuchitra_Stone-Chariot-Hampi.jpg',
        rating: 4.8
    },
    {
        id: 2,
        name: 'Jaipur, Rajasthan',
        description: 'Jaipur, the capital city of Rajasthan, is known as the "Pink City" due to its distinct pink-colored buildings. It is famous for its majestic forts, palaces, and vibrant culture.',
        image: 'https://www.virtuoso.com/getattachment/articles/Virtuoso-Life/Virtuoso-Life-July-2019/city-guide-jaipur-india/JaipurCityGuide_HawaMahal.jpg.aspx?lang=en-US&width=1200&height=857&ext=.jpg',
        rating: 4.9
    },
    {
        id: 3,
        name: 'Varanasi, Uttar Pradesh',
        description: 'Varanasi, also known as Kashi, is one of the oldest living cities in the world. It is a major spiritual and cultural hub, known for its ghats along the River Ganges, temples, and vibrant festivals.',
        image: 'https://blogs.revv.co.in/blogs/wp-content/uploads/2020/08/Varanasi-1024x666.jpg',
        rating: 4.7
    }
];





const PopularDestinations = () => {
    return (
        <section className="py-16 px-6 md:px-10 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover breathtaking locations curated by our AI to match your travel preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {destinations.map((destination) => (
                        <div key={destination.id} className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                        <span className="ml-1 text-gray-700 font-medium">{destination.rating}</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">{destination.description}</p>
                                <a href="/create-trip">

                                <Button
                                    className="w-full cursor-pointer bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600"
                                    variant="primary"
                                >
                                    Plan Your Trip
                                </Button>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to = {"create-trip"}>
                    <Button
                        className="px-8 cursor-pointer mt-10 py-3 bg-white text-teal-600 border border-teal-600 hover:bg-teal-50"
                        variant="outline"
                        size="lg"
                    >
                        Get Started
                    </Button>
                    </Link> 
                </div>
            </div>
        </section>
    );
};

export default PopularDestinations;
