import { axios } from "./index";

export const getAllNotifications = () =>
  axios.get("/api/notifications/user-notifications");
