import { axios } from "@/services";

export const getDesiredUser = (name) => axios.get(`/api/user/${name}`);

export const getLoggedInUser = () => axios.get("/api/user-state/user-info");

export const logInUser = (info) => axios.post("/api/user-state/login", info);

export const logoutUser = () => axios.get("/api/user-state/logout");
