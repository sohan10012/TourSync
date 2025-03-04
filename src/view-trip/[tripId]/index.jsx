import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { toast } from 'sonner';
import InfoSec from '../components/InfoSec';
import '../../App.css'
import Hotels from '../components/hotels';
import Placesvisit from '../components/Placesvisit';
import Footer from '../components/footer';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({}); // Changed to an object

  const GetTripData = useCallback(async () => {
    const docRef = doc(db, "toursyncs", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      console.log(docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("error");
      toast("NO TRIP FOUND!");
    }
  }, [tripId]);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId, GetTripData]);

  return (
    <div className='p-10 sm:px-10 md:px-16 lg:px-32 xl:px-44'>
      <InfoSec trip={trip} />
      <Hotels trip={trip} />
      <Placesvisit trip={trip} />
      <Footer/>
    </div>
  );
}

export default Viewtrip;
