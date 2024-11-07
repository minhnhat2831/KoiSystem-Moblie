import axios from "axios";

const API = axios.create({
  baseURL: "https://c6ad-2405-4802-8150-5810-1948-6601-18e4-ea9a.ngrok-free.app", 
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  response => response,
  error => {
    console.log("API Error:", error?.response || error?.message || error);
    return Promise.reject(error);
  }
);

export default API;
