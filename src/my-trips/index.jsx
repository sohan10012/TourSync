import { db } from '@/config/firebase';
import { collection, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocs } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import UserTrip from './components/UserTrip';

function MyTrips() {
    const navigate = useNavigate();
    const [userTrip, setUserTrips] = useState([]);

    useEffect(() => {
        // Check if data is already fetched before calling GetUserTrips
        if (userTrip.length === 0) {
            GetUserTrips();
        }
    }, []);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/');
            return;
        }

        // Clear state before fetching new data
        setUserTrips([]);
        const q = query(collection(db, 'toursyncs'), where('userEmail', '==', user.email));
        const querySnapshot = await getDocs(q);
        const trips = [];

        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            trips.push({ id: doc.id, ...doc.data() });
        });

        // Update state with new data only once
        setUserTrips(trips);
        console.log(trips); // Log the state to verify data
    };

    return (
        <div className='items-center px-10 md:px-18 lg:px-16 xl:px-25 mt-10'>
            <h2 className='font-bold text-3xl mb-10'>My trips</h2>
            <div className=' grid md:grid-cols-2 gap-10 lg:gap-15 xl:grid-cols-3'>
                {userTrip.map((trip) => (
                    <UserTrip key={trip.id} trip={trip} />
                ))}
            </div>
        </div>
    );
}

export default MyTrips;
