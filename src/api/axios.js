import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // your backend /api URL
});

API.interceptors.request.use((req) => {
  // Skip token for login/register
  if (req.url.includes("/login") || req.url.includes("/register")) return req;

  const token = localStorage.getItem("jwt"); // must match login storage key
  console.log("Sending token:", token);

  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
