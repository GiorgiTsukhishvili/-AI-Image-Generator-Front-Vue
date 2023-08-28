<template>
  <div class="bg-neutral-100 min-h-screen pb-40 pt-60">
    <WrapperComponent>
      <div>
        <h1 class="md:text-4xl text-2xl font-semibold block w-full">
          My Subscribers:
        </h1>
        <ul class="mt-16 flex flex-wrap gap-20">
          <li
            v-for="subscriber in subscribers"
            :key="subscriber.id"
            class="flex flex-col items-center"
          >
            <RouterLink
              :to="{
                name: 'user',
                params: { name: subscriber.subscribes.name },
              }"
              class="flex flex-col items-center"
            >
              <img
                :src="subscriber.subscribes.image"
                :alt="subscriber.subscribes.name + ' image'"
                class="w-40 h-40 object-cover rounded-full"
              />
              <h2 class="mt-6 font-semibold text-center md:text-3xl text-2xl">
                {{ subscriber.subscribes.name }}
              </h2>
            </RouterLink>
          </li>
        </ul>
      </div>
    </WrapperComponent>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores";

import { ref, watchEffect } from "vue";

import { WrapperComponent } from "@/components";

import { userSubscribers } from "@/services";

const user = useUserStore();
const subscribers = ref([]);

const subscribes = async () => {
  const data = await userSubscribers();

  subscribers.value = data.data.subscribers;
};

watchEffect(() => {
  if (user.user) {
    subscribes();
  }
});
</script>
