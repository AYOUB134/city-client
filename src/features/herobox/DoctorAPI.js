// DoctorAPI.js

const BASE_URL = 'http://city-server-production.up.railway.app/api/v1';

export const fetchDoctors = async () => {
  try {
    const response = await fetch('http://city-server-production.up.railway.app/api/v1/doctors');
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching doctors:', error.message);
    throw error; // Rethrow the error to be caught higher up
  }
};

export const createDoctor = async (doctorData) => {
  try {
    console.log(doctorData)
    const response = await fetch('http://localhost:5000/api/v1/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctorData),
    });
    if (!response.ok) {
      throw new Error('Failed to create doctor');
    }
    return response.json();
  } catch (error) {
    console.error('Error creating doctor:', error.message);
    throw error; // Rethrow the error to be caught higher up
  }
};
