import { axios } from "./index";

export const getAllBlogs = (page = 1) => axios.get(`/api/blog?page=${page}`);

export const getSingleBlog = (id) => axios.get(`/api/blog/${id}`);
