import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // change this to deployed backend later
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
