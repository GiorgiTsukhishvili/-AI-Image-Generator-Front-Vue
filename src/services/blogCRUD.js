import { axios } from "./index";

export const getAllBlogs = (page = 1, query) =>
  axios.get(`/api/blog?page=${page}`, { params: { ...query } });

export const getSingleBlog = (id) => axios.get(`/api/blog/${id}`);

export const getUserBlogs = () => axios.get(`/api/blog/user/blogs`);

export const createBlog = (data) =>
  axios.post("/api/blog", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateBlog = (id, data) =>
  axios.post(`/api/blog/${id}?_method=put`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteBlog = (id) => axios.delete(`/api/blog/${id}`);

export const getTags = () => axios.get("api/tags");
