import { axios } from "@/services";

export const getDesiredUser = (name) => axios.get(`/api/user/${name}`);

export const getLoggedInUser = () => axios.get("/api/user-state/user-info");
