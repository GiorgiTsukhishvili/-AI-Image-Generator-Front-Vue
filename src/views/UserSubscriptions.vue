<template>
  <div class="bg-neutral-100 min-h-screen pb-40 pt-60">
    <WrapperComponent>
      <div>
        <h1 class="md:text-4xl text-2xl font-semibold block w-full">
          My Subscriptions:
        </h1>
        <ul class="mt-16 flex flex-wrap gap-20">
          <RouterLink
            v-for="subscriber in subscribers"
            :key="subscriber.id"
            :to="{ name: 'user', params: { name: subscriber.user.name } }"
            class="flex flex-col items-center"
          >
            <img
              :src="subscriber.user.image"
              :alt="subscriber.user.name + ' image'"
              class="w-40 h-40 object-cover rounded-full"
            />
            <h2 class="mt-6 font-semibold text-center md:text-3xl text-2xl">
              {{ subscriber.user.name }}
            </h2>
          </RouterLink>
        </ul>
      </div>
    </WrapperComponent>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores";

import { WrapperComponent } from "@/components";

const user = useUserStore();
const subscribers = ref([]);

import { userSubscribes } from "@/services";
import { ref, watchEffect } from "vue";

const userSubscribers = async () => {
  const data = await userSubscribes();
  console.log(data.data.subscribers);
  subscribers.value = data.data.subscribers;
};

watchEffect(() => {
  if (user.user) {
    userSubscribers();
  }
});
</script>
