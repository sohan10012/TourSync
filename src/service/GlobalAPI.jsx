const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'
import axios from "axios"

const config = {
    headers: { 
        'Content-type': "application/json",
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY, 
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id',
        ]
    }
}

export const GetPlaceDetails = (data) => axios.post(`${BASE_URL}?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`, data, config); 
export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
