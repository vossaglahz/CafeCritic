
import axios from "axios";

export const axiosApiClient = axios.create({
  baseURL: "http://localhost:8000"
});