import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
