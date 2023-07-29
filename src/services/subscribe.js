import { axios } from "@/services";

export const addSubscribe = (data) => axios.post("/api/subscribe", data);
