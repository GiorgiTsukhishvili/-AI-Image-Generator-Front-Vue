<template>
  <div></div>
</template>

<script setup>
import { useUserStore } from "@/stores";

const user = useUserStore();
const collections = ref([]);

import { userSubscribes } from "@/services";
import { ref, watchEffect } from "vue";

const userCollections = async () => {
  const data = await userSubscribes();

  collections.value = data.data;
};

watchEffect(() => {
  if (user.user) {
    userCollections();
  }
});
</script>
