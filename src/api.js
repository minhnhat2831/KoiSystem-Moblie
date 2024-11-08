import axios from "axios";

const API = axios.create({
  baseURL: "https://059d-2405-4802-8150-5810-6df1-904f-7435-c32e.ngrok-free.app", 
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
