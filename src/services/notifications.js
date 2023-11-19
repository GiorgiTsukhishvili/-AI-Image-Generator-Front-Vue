import { axios } from "./index";

export const getAllNotifications = () =>
  axios.get("/api/notifications/user-notifications");

export const markNotificationRead = (ids) =>
  axios.post("/api/notifications/mark", { params: { ids } });
