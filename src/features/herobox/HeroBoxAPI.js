const BASE_URL = 'http://localhost:5000/api/v1';

export const fetchPatients = async () => {
  const response = await fetch(`${BASE_URL}/patients`);
  if (!response.ok) {
    throw new Error('Failed to fetch patients');
  }
  return response.json();
};

export const createPatient = async (patientData) => {
  console.log("patientData")
  console.log(patientData)
  const response = await fetch(`${BASE_URL}/patients`, {
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
