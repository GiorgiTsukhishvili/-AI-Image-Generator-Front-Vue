import { axios } from "./index";

export const getAllBlogs = async () => await axios.get("/api/blog");
