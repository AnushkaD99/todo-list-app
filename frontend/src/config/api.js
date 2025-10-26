import axios from "axios";
import { CONFIGURATIONS } from "./envConfig";

export const api = axios.create({
  baseURL: `${CONFIGURATIONS.API_BASE_URL}/` || 'http://localhost:3000',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);