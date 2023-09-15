import { axios } from "@/services";

export const getDesiredCollection = (user, query) =>
  axios.get(`/api/collection/${user}`, { params: { ...query } });

export const getUserCollections = () =>
  axios.get(`/api/collection/user/collections`);

export const createCollection = (data) =>
  axios.post(`/api/collection/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateCollection = (id, data) =>
  axios.post(`/api/collection/${id}?_method=put`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteCollection = (collectionId) =>
  axios.delete(`/api/collection/${collectionId}`);
