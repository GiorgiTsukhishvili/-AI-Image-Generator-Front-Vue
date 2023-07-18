import { axios } from "./index";

export const getAllBlogs = (page = 1, query) =>
  axios.get(`/api/blog?page=${page}`, { params: { ...query } });

export const getSingleBlog = (id) => axios.get(`/api/blog/${id}`);
