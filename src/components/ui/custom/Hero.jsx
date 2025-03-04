import 'react';
import { Button } from '../button'
import { Search, MapPin } from 'lucide-react';

function Hero() {
  return (
    <div className='flex flex-col items-center mx-6 md:mx-12 lg:mx-24 xl:mx-56 gap-6 md:gap-9 text-center'>
  <h1 className='font-extrabold text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-10 md:mt-14'>
    <span className='bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500'>
      Embark on Your Dream Journey with TourSync: Your AI-Driven Travel Companion
    </span>
  </h1>
  <p className='text-lg sm:text-xl font-medium text-gray-500'>
    Your Personal Trip Planner and Travel Curator, Crafting Custom Journeys Tailored Just for You.
  </p>
  <hr className='border-t-2 border-teal-500 w-full my-6' />

      <div className="bg-white border-2 border-gray-300 p-4 rounded-lg shadow-xl mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <a href="/create-trip">
          <Button
            className=" cursor-pointer bg-gradient-to-r mt-1.5 from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-6"
            variant="primary"
          >
            <Search className="mr-2 " size={18} />
            Plan My Trip
          </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero;
