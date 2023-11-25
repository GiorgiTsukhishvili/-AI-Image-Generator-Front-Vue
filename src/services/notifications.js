import { axios } from "./index";

export const getAllNotifications = () =>
  axios.get("/api/notifications/user-notifications");

export const markNotificationRead = (ids, user_id) =>
  axios.post("/api/notifications/mark", { user_id, ids });
