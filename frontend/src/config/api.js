import axios from "axios";
import { CONFIGURATIONS } from "./envConfig";

export const api = axios.create({
  baseURL: `${CONFIGURATIONS.API_BASE_URL}/`,
  withCredentials: true, // Ensures cookies are included in all requests
});