import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL,
});

const token = localStorage.getItem("token");

if (token) {
  API.defaults.headers.common.Authorization = `Bearer ${token}`;
}

API.interceptors.request.use((req) => {
  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${storedToken}`,
    };
  }

  return req;
});

export default API;
