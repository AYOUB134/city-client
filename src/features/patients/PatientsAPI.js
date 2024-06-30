
// src/features/patients/PatientsAPI.js

const baseUrl = 'https://city-server-production.up.railway.app/api/v1/patients';

export const fetchPatients = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to fetch patients');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch patients');
  }
};

export const updatePatient = async (patientId, updatedPatientData) => {
  try {
    const response = await fetch(`${baseUrl}/${patientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPatientData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to update patient');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to update patient');
  }
};

export const addPatient = async (newPatientData) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPatientData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to add new patient');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to add new patient');
  }
};



















// // src/features/patients/PatientsAPI.js

// const baseUrl = 'http://localhost:5000/api/v1/patients';

// export const fetchPatients = async () => {
//   try {
//     const response = await fetch(baseUrl);
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.msg || 'Failed to fetch patients');
//     }
//     return response.json();
//   } catch (error) {
//     throw new Error(error.message || 'Failed to fetch patients');
//   }
// };

// export const updatePatientStatus = async (patientId, status, bill) => {
//   try {
//     const response = await fetch(`${baseUrl}/${patientId}/status`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ status, bill }),
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.msg || 'Failed to update patient status');
//     }
//     return response.json();
//   } catch (error) {
//     throw new Error(error.message || 'Failed to update patient status');
//   }
// };

// export const addPatient = async (newPatientData) => {
//   try {
//     const response = await fetch(baseUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newPatientData),
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.msg || 'Failed to add new patient');
//     }
//     return response.json();
//   } catch (error) {
//     throw new Error(error.message || 'Failed to add new patient');
//   }
// };
