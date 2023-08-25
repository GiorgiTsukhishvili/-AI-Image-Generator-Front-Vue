import { axios } from "@/services";

export const addSubscribe = (data) => axios.post("/api/subscribe", data);

export const userSubscribes = () => axios.get("/api/subscribe");
