import axios from "axios";
import { BASE_URL } from "./apiPaths";

// create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,  // base URL for all queries
  timeout: 10000, // timeout for requests
  headers: {
    "Content-Type": "application/json", // default content type
    Accept: "application/json", // default accept type
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // get the access token from local storage
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      // if token exists, add it to the Authorization header
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;  // return the modified config
  },
  (error) => {
    // handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // return the response data if the request is successful
    return response;
  },
  (error) => {
    // Handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // Token expired or unauthorized
        console.error("Unauthorized! Redirecting to login...");
        // Redirect to login page
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        // internal server error
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      // request timeout
      console.error("Request timeout. Please try again.");
    }
    // reject the promise with the error object
    return Promise.reject(error);
  }
);

export default axiosInstance;
