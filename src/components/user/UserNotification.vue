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
    class="md:min-w-[300px] md:max-w-[500px] gap-5 flex flex-col md:justify-start justify-center md:items-start items-center md:h-auto h-screen w-screen rounded-md z-50 px-6 py-6 bg-white md:absolute fixed duration-500 origin-top md:top-24 top-0 shadow-xl right-0"
    :style="{ transform: isNotificationOpen ? 'scaleY(1)' : 'scaleY(0)' }"
    @mouseleave="() => (isNotificationOpen = false)"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="flex gap-5 items-center justify-start"
    >
      <img
        :src="notification.creator.image"
        :alt="notification.creator.name + ' image'"
        class="w-20 h-20 rounded-full"
      />
      <div>
        <div class="text-lg">
          <RouterLink
            :to="{ name: 'user', params: { name: notification.creator.name } }"
            class="text-blue-600"
          >
            {{ notification.creator.name }}
          </RouterLink>
          has
          {{
            notification.type === "subscribed"
              ? "subscribed to you."
              : notification.type === "like"
              ? "liked your blog"
              : ""
          }}
          <RouterLink
            :to="{
              name: 'blog',
              params: {
                name: notification.blog.title,
                id: notification.blog.id,
              },
            }"
            class="text-blue-600"
            v-if="notification.blog"
          >
            {{
              notification.blog.title.length > 50
                ? notification.blog.title.slice(0, 50) + "..."
                : notification.blog.title
            }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { NotificationIcon } from "@/components";
import { getAllNotifications } from "@/services";
import { RouterLink } from "vue-router";

const isNotificationOpen = ref(false);
const notificationNumber = ref(0);

const notifications = ref([]);

const getNotifications = async () => {
  const data = await getAllNotifications();

  notifications.value = data.data;
  notificationNumber.value = data.data.filter(
    (notification) => notification.is_new
  ).length;

  console.log(data.data);
};

onMounted(() => getNotifications());
</script>
