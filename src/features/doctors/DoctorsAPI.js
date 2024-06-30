const BASE_URL = 'http://localhost:5000/api/v1';

export const fetchDoctors = async () => {
  try {
    const response = await fetch(`${BASE_URL}/doctors`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('API response:', data);
    return data; // Ensure this matches the structure expected in the slice
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};
