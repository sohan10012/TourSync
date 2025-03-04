import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AI_PROMPT, SelectBudgetOptions } from "@/constants/options";
import { SelectTravelesList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { chatSession } from "@/service/AIMODAL";
import { useGoogleLogin } from "@react-oauth/google";
import { AiOutlineLoading } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [openDialogue, setOpenDialogue] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialogue(true);
      return;
    }

    const errors = {};
    if (!formData.location) {
      errors.location = "Location is required";
    }
    if (!formData.noofDays) {
      errors.noofDays = "Number of days is required";
    } else if (formData.noofDays > 10) {
      errors.noofDays = "Number of days cannot be more than 10";
    }
    if (!formData.budget) {
      errors.budget = "Budget is required";
    }
    if (!formData.traveller) {
      errors.traveller = "Traveller information is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("All fields are required.");
      return;
    }

    if (formData?.noofDays > 10) {
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totaldays}", formData?.noofDays)
      .replace("{traveller}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totaldays}", formData?.noofDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "toursyncs", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId); 
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialogue(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="items-center sm:px-10 md:px-32 lg:px-56 xl:px-80 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell your travel preferences 🏕️✈️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences{" "}
      </p>

      <div className="mt-20 flex-col flex gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice? 🗺️🌟
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (e) => {
                setPlace(e);
                handleInputChange("location", e);
                setFormErrors((prev) => ({ ...prev, location: "" }));
              },
            }}
          />
          {formErrors.location && (
            <p className="text-red-500">{formErrors.location}</p>
          )}
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip? 🏖️⏳
          </h2>
          <Input
            required
            className="py-5  border-gray-400 hover:shadow-md focus:white focus:accent-white"
            type="number"
            placeholder="Ex.3"
            onChange={(e) => {
              handleInputChange("noofDays", e.target.value);
              setFormErrors((prev) => ({ ...prev, noofDays: "" })); // Clear error on change
            }}
          />
          {formErrors.noofDays && (
            <p className="text-red-500">{formErrors.noofDays}</p>
          )}
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl my-3 font-bold mb-8">What is your budget?</h2>
        <div className="cursor-pointer grid grid-cols-2 md:grid-cols-3 gap-7 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                handleInputChange("budget", item.title);
                setFormErrors((prev) => ({ ...prev, budget: "" })); // Clear error on change
              }}
              className={`bg-gray-100 p-4 border rounded-lg hover:shadow-lg
              ${formData?.budget == item.title && "shadow-lg border-cyan-700"}`}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="py-2 font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
        {formErrors.budget && (
          <p className="text-red-500">{formErrors.budget}</p>
        )}
      </div>

      <hr className="border-gray-300 mt-18" />

      <div className="mt-16">
        <h2 className="text-3xl my-3 font-bold mb-8">
          Who do you plan on travelling with? 👫
        </h2>
        <div className="cursor-pointer grid grid-cols-3 gap-7 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                handleInputChange("traveller", item.people);
                setFormErrors((prev) => ({ ...prev, traveller: "" })); // Clear error on change
              }}
              className={`bg-gray-100 p-4 border rounded-lg hover:shadow-lg
              ${
                formData?.traveller == item.people &&
                "shadow-lg border-cyan-700"
              }`}
            >
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="py-2 font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
        {formErrors.traveller && (
          <p className="text-red-500">{formErrors.traveller}</p>
        )}
      </div>

      <div className="my-10 flex justify-center">
        <Button
          disabled={loading}
          className="cursor-pointer mt-5 shadow-md h-12"
          onClick={OnGenerateTrip}
        >
          {loading ? <AiOutlineLoading  className=" h-7 w-7 animate-spin" /> : 'Generate Trip 🤖'}
        </Button>
      </div>

      <Dialog open={openDialogue}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col items-center">
                <img className="h-48 -mt-4.5" src="./image.png" alt="" />
                <h2 className="font-bold text-2xl mb-4">Sign in with Google</h2>
                <p>Sign into the website with Google Authentication securely</p>
                <Button
                  disabled={loading}
                  onClick={login}
                  className="w-full text-lg h-auto mt-5 flex gap-3 items-center"
                >
                  <>
                  <FcGoogle className="h-7 w-7" />
                  Sign in with Google
                  </>
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
