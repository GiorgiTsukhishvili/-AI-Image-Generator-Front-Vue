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
</template>

<script setup>
import { ref } from "vue";

import { NotificationIcon } from "@/components";

const isNotificationOpen = ref(false);
const notificationNumber = ref(1);
</script>
