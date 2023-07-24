import { axios } from "@/services";

export const likeBlog = (info) => axios.post("/api/like", info);
