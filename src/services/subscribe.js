import { axios } from "@/services";

export const addSubscribe = (data) => axios.post("/api/subscribe", data);

export const userSubscriptions = () => axios.get("/api/subscribe/subscribers");

export const userSubscribers = () => axios.get("/api/subscribe");
