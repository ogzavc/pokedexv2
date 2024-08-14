import axios from "axios";
import config from "../config/prod.json";

const apiBaseUrl = config.apiBaseUrl;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

export default axiosInstance;
