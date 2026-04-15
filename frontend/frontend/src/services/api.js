import axios from "axios";

const API = axios.create({
  baseURL: "https://task-management-app-uce7.onrender.com/api/tasks",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
