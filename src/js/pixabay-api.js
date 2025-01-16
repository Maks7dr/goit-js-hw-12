import axios from 'axios';

const API_KEY = '48145276-ba1887f72c90a3fcdb02285cd';

export async function fetchImages(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: perPage,
    page,
  };

  try {
    const response = await axios.get(`https://pixabay.com/api/?`, { params });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
