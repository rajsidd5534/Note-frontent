import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., https://note-backend-production-bfdb.up.railway.app/api
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("jwt"); // MUST match login storage key
  console.log("Sending token:", token); // debug log
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
