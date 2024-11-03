import axios from "axios";

const API = axios.create({
  baseURL: "https://73aa-1-55-80-89.ngrok-free.app", //Thay đổi để kết nối với BE
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
