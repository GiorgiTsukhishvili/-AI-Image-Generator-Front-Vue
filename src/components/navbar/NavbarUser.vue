<template>
  <div @focusout="() => (dropdown = false)" tabindex="0" class="relative">
    <img
      :src="props.userInfo.user.image"
      :alt="props.userInfo.user.name + ' image'"
      class="w-16 h-16 rounded-full cursor-pointer"
      @click="() => (dropdown = true)"
    />

    <div
      class="md:w-[300px] flex flex-col md:justify-start justify-center md:items-start items-center md:h-auto h-screen w-screen rounded-md z-50 px-6 py-6 bg-white md:absolute fixed duration-500 origin-top md:top-24 top-0 shadow-xl right-0"
      :style="{ transform: dropdown ? 'scaleY(1)' : 'scaleY(0)' }"
    >
      <button
        @click="logout"
        class="text-2xl font-semibold flex items-center gap-3"
      >
        Logout <LogoutIcon />
      </button>
      <span
        class="absolute md:hidden right-10 top-10"
        @click="() => (dropdown = false)"
        ><CloseIcon
      /></span>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

import { logoutUser, getCSRF } from "@/services";

import { LogoutIcon, CloseIcon } from "@/components";

const props = defineProps({ userInfo: { required: true } });

const dropdown = ref(false);

watchEffect(() => {
  if (dropdown.value && window.innerWidth < 768) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
});

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
