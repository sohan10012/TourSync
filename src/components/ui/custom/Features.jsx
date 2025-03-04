import  'react';
import { Brain, Calendar, Map, Sparkles, Clock, Compass } from 'lucide-react';

const features = [
    {
        icon: <Brain className="h-8 w-8 text-teal-500" />,
        title: 'AI-Powered Recommendations',
        description: 'Our advanced AI analyzes your preferences to suggest personalized destinations and activities.'
    },
    {
        icon: <Calendar className="h-8 w-8 text-teal-500" />,
        title: 'Smart Itinerary Planning',
        description: 'Create optimized day-by-day itineraries that maximize your time and experiences.'
    },
    {
        icon: <Map className="h-8 w-8 text-teal-500" />,
        title: 'Interactive Maps',
        description: 'Visualize your entire trip with interactive maps showing attractions, restaurants, and accommodations.'
    },
    {
        icon: <Sparkles className="h-8 w-8 text-teal-500" />,
        title: 'Unique Experiences',
        description: 'Discover hidden gems and local favorites that most tourists never find.'
    },
    {
        icon: <Clock className="h-8 w-8 text-teal-500" />,
        title: 'Real-time Updates',
        description: 'Get instant notifications about weather changes, attraction closures, or better alternatives.'
    },
    {
        icon: <Compass className="h-8 w-8 text-teal-500" />,
        title: 'Offline Access',
        description: 'Access your travel plans anytime, anywhere, even without an internet connection.'
    }
];

const Features = () => {
    return (
        <section className="py-16 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose TravelAI</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our AI-powered platform makes travel planning effortless and personalized
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="bg-teal-50 p-3 rounded-lg inline-block mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;