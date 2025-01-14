const API_KEY = '48145276-ba1887f72c90a3fcdb02285cd';

export async function fetchImages(query) {
  const option = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  try {
    const response = await fetch(`https://pixabay.com/api/?${option}`);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
