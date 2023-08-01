<template>
  <div
    @focus="() => (dropdown = true)"
    @focusout="() => (dropdown = false)"
    tabindex="0"
    class="relative"
  >
    <img
      :src="props.userInfo.user.image"
      :alt="props.userInfo.user.name + ' image'"
      class="w-16 h-16 rounded-full cursor-pointer"
    />

    <div
      class="w-[300px] rounded-md z-50 px-6 py-6 bg-white absolute duration-500 origin-top top-24 shadow-xl right-0"
      :style="{ transform: dropdown ? 'scaleY(1)' : 'scaleY(0)' }"
    >
      <button
        @click="logout"
        class="text-2xl font-semibold flex items-center gap-3"
      >
        Logout <LogoutIcon />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { logoutUser, getCSRF } from "@/services";

import { LogoutIcon } from "@/components";

const props = defineProps({ userInfo: { required: true } });

const dropdown = ref(false);

const logout = async () => {
  try {
    await getCSRF();
    await logoutUser();
    props.userInfo.setUserInfo(null);
  } catch (err) {
    console.log(err);
  }
};
</script>
