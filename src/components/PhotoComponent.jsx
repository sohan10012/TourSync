import  { useState, useEffect } from 'react';
import getPhotoWithBackoff from '../utils/api';

const PhotoComponent = () => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const apiUrl = 'YOUR_API_URL_HERE';
      try {
        const photoData = await getPhotoWithBackoff(apiUrl);
        setPhotoUrl(photoData.url); // Adjust this line based on the actual response structure
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPhoto();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {photoUrl && <img src={photoUrl} alt="Fetched from API" />}
    </div>
  );
};

export default PhotoComponent;
