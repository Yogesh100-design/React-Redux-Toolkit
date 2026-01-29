import axios from "axios";

const SPLASH_KEY = import.meta.env.VITE_SPLASH_KEY;
const PIXEL_KEY = import.meta.env.VITE_PEXELS_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

const BASE_URL = 'https://api.giphy.com/v1/gifs';

export async function fetchPhotos(query,page,page_size=20){
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos',
      {
          params:{query,page,per_page:page_size},
          headers:{Authorization:  `Client-ID ${SPLASH_KEY}`}
      }
    )

    console.log('Photos Response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Unsplash API Error:", error.response?.data || error.message);
    throw error;
  }
}

export async function fetchVideos(query, page = 1, per_page = 20) {
  try {
    const response = await axios.get('https://api.pexels.com/videos/search', {
      params: { 
        query, 
        page, 
        per_page 
      },
      headers: { 
        Authorization: PIXEL_KEY 
      }
    });

    console.log('Videos Response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Pexels API Error:", error.response?.data || error.message);
    throw error;
  }
}

export const fetchGifs = async (query, limit = 20) => {
  try {
    // If no query, we show 'trending', otherwise we use 'search'
    const endpoint = query ? `${BASE_URL}/search` : `${BASE_URL}/trending`;
    
    const response = await axios.get(endpoint, {
      params: {
        api_key: GIPHY_KEY,
        q: query,
        limit: limit,
        rating: 'g', // Safe for work
      },
    });
    
    console.log('GIFs Response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Giphy API Error:", error);
    throw error;
  }
};