import { axios } from "@/services";

export const getDesiredUser = (name) => axios.get(`/api/user/${name}`);
