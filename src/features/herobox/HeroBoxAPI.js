// src/features/herobox/HeroBoxAPI.js

export const fetchPatients = async () => {
  const response = await fetch('http://localhost:5000/api/v1/patients');
  if (!response.ok) {
    throw new Error('Failed to fetch patients');
  }
  return response.json();
};

export const createPatient = async (patientData) => {
  const response = await fetch('http://localhost:5000/api/v1/patients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patientData),
  });
  if (!response.ok) {
    throw new Error('Failed to create patient');
  }
  return response.json();
};
