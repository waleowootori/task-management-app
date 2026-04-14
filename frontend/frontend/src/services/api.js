import axios from "axios";

const API = axios.create({
  baseURL: "https://task-management-app-uce7.onrender.com",
});

export default API;
