import { useEffect, useState } from 'react';
import { Button } from '../button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../dialog";
import { FcGoogle } from "react-icons/fc";
import { Compass, Map, Navigation } from 'lucide-react';
import axios from 'axios';

function Header() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  const [openDialogue, setOpenDialogue] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.error("Login Failed:", error),
  });

  const getUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setOpenDialogue(false);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Logo and Brand */}
          <div className="flex sm:justify-start items-center justify-center w-full sm:w-auto mb-3 sm:mb-0">
            <Navigation className="h-6 w-6 sm:h-7 md:h-8 sm:w-7 md:w-8 text-white" />
            <span className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight ml-2 sm:ml-3">
              TourSync
            </span>
          </div>

          {/* Buttons and Profile section */}
          {user ? (
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
              {/* Create Trip Button */}
              <a href="/create-trip" className="flex-1 sm:flex-none">
                <Button className="rounded-full cursor-pointer bg-white text-indigo-700 hover:bg-indigo-100 font-medium text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 shadow-md transition-all sm:w-auto w-full">
                  <Compass className="mr-1 sm:mr-1.5 md:mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                  <span className="whitespace-nowrap">Create Trip</span>
                </Button>
              </a>

              {/* My Trips Button */}
              <a href="/my-trips" className="flex-1 sm:flex-none">
                <Button className="rounded-full cursor-pointer bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-medium text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 transition-all sm:w-auto w-full">
                  <Map className="mr-1 sm:mr-1.5 md:mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                  <span className="whitespace-nowrap">My Trips</span>
                </Button>
              </a>

              {/* Profile Popover */}
              <div className="flex-shrink-0">
                <Popover>
                  <PopoverTrigger>
                    <div className="relative">
                      <img
                        src={user?.picture}
                        className="cursor-pointer rounded-full h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 border-2 border-white hover:border-purple-300 transition-all"
                        alt="User Avatar"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-white"></div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 border border-gray-200 shadow-lg rounded-lg bg-white w-48 sm:w-56">
                    <div className="py-2 sm:py-3 px-3 sm:px-4 border-b border-gray-100">
                      <p className="font-medium text-sm sm:text-base text-gray-800">
                        {user?.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {user?.email}
                      </p>
                    </div>
                    <div className="py-1 sm:py-2">
                      <button
                        className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-red-600 hover:bg-red-50 transition-colors"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setOpenDialogue(true)}
              className="rounded-full cursor-pointer bg-white text-indigo-700 hover:bg-indigo-100 font-medium text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 shadow-md transition-all w-full sm:w-auto"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      {/* Google Sign-in Dialog */}
      <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                  <Navigation className="h-16 w-16 text-indigo-600" />
                </div>
                <h2 className="font-bold text-2xl mb-3 text-gray-800">Welcome to TourSync</h2>
                <p className="text-center text-gray-600 mb-6">Sign in to access AI-powered trip sync and get history of your trips</p>
                <Button
                  onClick={login}
                  className="w-full text-lg h-auto py-3 mt-2 flex gap-3 items-center justify-center cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                >
                  <FcGoogle className="h-6 cursor-pointer w-6 bg-white rounded-full p-1" />
                  Sign in with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );

}

export default Header;
