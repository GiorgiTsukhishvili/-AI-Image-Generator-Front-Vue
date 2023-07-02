import { axios } from "@/services";

export const getCSRF = async () => await axios.get("/sanctum/csrf-cookie");
