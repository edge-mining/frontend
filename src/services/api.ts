import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1', // Reads from .env
  headers: {
    'Content-Type': 'application/json',
  },
});
