import axios from "axios";

// Function to get photo with exponential backoff
const getPhotoWithBackoff = async (apiUrl, maxRetries = 5) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers["Retry-After"] || 1;
        await new Promise((resolve) =>
          setTimeout(resolve, retryAfter * 1000 * Math.pow(2, attempt))
        );
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries exceeded");
};

export default getPhotoWithBackoff;
