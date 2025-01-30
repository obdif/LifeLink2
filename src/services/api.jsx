import axios from 'axios';

// Base URL for all requests
const api = axios.create({
  baseURL: 'https://lifelink-ordc.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// *** Hospital Services ***

// Function to create a hospital
export const createHospital = async (hospitalData) => {
  const response = await api.post('/hospital/create', hospitalData);
  return response.data;
};

// Function to login a hospital
export const loginHospital = async (regId) => {
  const response = await api.post('/hospital/login', { regId });
  return response.data;
};

// Function to verify a hospital
export const verifyHospital = async (regId) => {
  const response = await api.post('/hospital/verify', { regId });
  return response.data;
};

// Function to fetch hospital details by regId
export const getHospitalDetails = async (regId) => {
  const response = await api.get(`/hospital/${regId}`);
  return response.data;
};

// *** Patient Services ***

// Function to fetch all patients
export const getAllPatients = async () => {
  const response = await api.get('/patients');
  return response.data;
};

// Function to create a new patient
export const createPatient = async (patientData) => {
  const response = await api.post('/patients/create', patientData);
  return response.data;
};

// Function to search patients by fullName, phoneNumber, or hospitalName
export const searchPatients = async (searchParams) => {
  const response = await api.get('/patients/search', {
    params: searchParams, // Example: { fullName: "John", phoneNumber: "12345", hospitalName: "general" }
  });
  return response.data;
};

export default api;
