// src/home/HomeAPI.js

const API_URL = 'http://city-server-production.up.railway.app/api/v1/patients';

export const fetchPatients = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};
