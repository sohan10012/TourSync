import 'react';
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Globe className="h-6 w-6 text-teal-400" />
                            <span className="font-bold text-xl">TourSync</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Revolutionizing travel planning with artificial intelligence. Create personalized itineraries in minutes.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-teal-400">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-teal-400">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-teal-400">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-teal-400">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-teal-400">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Destinations</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Travel Guides</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                        </ul>
                    </div>

                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-teal-400">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>

                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-teal-400">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-teal-400 mr-2 mt-0.5" />
                                <span className="text-gray-400">Bengaluru , Karnataka, India</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-teal-400 mr-2" />
                                <span className="text-gray-400">100</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-teal-400 mr-2" />
                                <span className="text-gray-400">support@toursync.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    <p className="text-center text-gray-500">
                        © {new Date().getFullYear()} TourSync. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;