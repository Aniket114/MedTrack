import axios from 'axios';

const API = axios.create({
  baseURL: 'https://medtrack-backend-r6g5.onrender.com/api',
});
export const addMedicine = (data, token) =>
  API.post('/medicine/add', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMedicines = (token) =>
  API.get('/medicine/all', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteMedicine = (id, token) =>
  API.delete(`/medicine/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const signup = (data) => API.post('/auth/signup', data);

export const login = (data) => API.post('/auth/login', data);
