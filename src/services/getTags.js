import { axios } from "@/services";

export const getAllTags = () => axios.get("/api/tags");
