import { axios } from "@/services";

export const addComment = (data) => axios.post("/api/comment", data);
