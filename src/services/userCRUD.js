import { axios } from "@/services";

export const getDesiredUser = (name) => axios.get(`/api/user/${name}`);

export const getLoggedInUser = () => axios.get("/api/user-state/user-info");

export const createUser = (data) => axios.post("/api/user", data);

export const emailPassword = (data) =>
  axios.post("/api/user/password-email", data);

export const logInUser = (info) => axios.post("/api/user-state/login", info);

export const logoutUser = () => axios.get("/api/user-state/logout");

export const updateUser = (id, data) =>
  axios.post(`/api/user/${id}?_method=put`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
