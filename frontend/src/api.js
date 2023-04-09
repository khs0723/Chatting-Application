import axios from "axios";
import { logout } from "./utils/auth";

const apiClient = axios.create({
  baseURL: "http://localhost:5002/api",
  timeOut: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const token = JSON.parse(userData).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// public routes

export const login = async (data) => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// private routes

const checkResponseCode = (exception) => {
  const resCode = exception.response.status;
  if (resCode) {
    (resCode === 401 || resCode === 403) && logout();
  }
};
