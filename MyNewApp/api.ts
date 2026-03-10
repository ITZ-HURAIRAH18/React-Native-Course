import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Adjust this if your machine's local IP changes or for dynamic use
const BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password) => {
  const response = await api.post('/auth/login/', { username, password });
  if (response.data.access) {
    await AsyncStorage.setItem('user_token', response.data.access);
  }
  return response.data;
};

export const signup = async (username, password, email) => {
  return await api.post('/auth/signup/', { username, password, email });
};

export const analyzeSymptoms = async (symptoms) => {
  return await api.post('/analyze-symptoms/', { symptoms });
};

export const chatWithAI = async (message) => {
  return await api.post('/chat/', { message });
};

export const getAppointments = async () => {
  return await api.get('/appointments/');
};

export const bookAppointment = async (data) => {
  return await api.post('/appointments/', data);
};

export default api;
