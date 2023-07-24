import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);

  function setUserInfo(info) {
    user.value = info;
  }

  return { user, setUserInfo };
});
