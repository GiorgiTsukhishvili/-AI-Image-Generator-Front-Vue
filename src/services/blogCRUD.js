import { axios } from "./index";

export const getAllBlogs = async () => await axios.get("/api/blog");

export const getSingleBlog = async (id) => await axios.get(`/api/blog/${id}`);
