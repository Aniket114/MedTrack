import axios from 'axios';

const API = axios.create({
  baseURL: 'https://medtrack-backend-r6g5.onrender.com/api', // ✅ Updated live backend URL
});

// Auth APIs
export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
