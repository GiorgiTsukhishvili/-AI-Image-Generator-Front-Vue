<template>
  <div
    @click="() => (isNotificationOpen = true)"
    class="cursor-pointer relative"
  >
    <NotificationIcon />
    <div
      v-if="notificationNumber !== 0"
      class="text-white bg-red-600 px-[6px] pb-2 py-3 rounded-full flex justify-center items-center leading-[0] absolute top-0 -right-0.5"
    >
      {{ notificationNumber }}
    </div>
  </div>

  <div
    class="md:w-[300px] gap-5 flex flex-col md:justify-start justify-center md:items-start items-center md:h-auto h-screen w-screen rounded-md z-50 px-6 py-6 bg-white md:absolute fixed duration-500 origin-top md:top-24 top-0 shadow-xl right-0"
    :style="{ transform: isNotificationOpen ? 'scaleY(1)' : 'scaleY(0)' }"
    @mouseleave="() => (isNotificationOpen = false)"
  ></div>
</template>

<script setup>
import { ref } from "vue";

import { NotificationIcon } from "@/components";

const isNotificationOpen = ref(false);
const notificationNumber = ref(1);
</script>
