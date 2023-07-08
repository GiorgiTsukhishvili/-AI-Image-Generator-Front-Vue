import { axios } from "./index";

export const getAllBlogs = async (page = 1) =>
  await axios.get(`/api/blog?page=${page}`);

export const getSingleBlog = async (id) => await axios.get(`/api/blog/${id}`);
