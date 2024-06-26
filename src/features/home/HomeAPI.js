// src/home/HomeAPI.js

const API_URL = 'http://localhost:5000/api/v1/patients';

export const fetchPatients = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};
