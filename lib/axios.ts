import axios from "axios";

const api = axios.create({
  baseURL: "https://autoops-vapi-backend.onrender.com/api", // Set your backend base URL here
  withCredentials: false, // Set to true if you use cookies/session
  headers: {
    "Content-Type": "application/json",
  },
});

// You can add interceptors here if needed
// api.interceptors.request.use(...)
// api.interceptors.response.use(...)

export default api;
