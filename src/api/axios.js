import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., https://note-backend-production-bfdb.up.railway.app/api
});

// Interceptor to attach JWT
API.interceptors.request.use((req) => {
  // Skip attaching token for login or register requests
  if (req.url.includes("/login") || req.url.includes("/register")) {
    return req;
  }

  const token = localStorage.getItem("jwt"); // must match login storage key
  console.log("Sending token:", token);

  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
