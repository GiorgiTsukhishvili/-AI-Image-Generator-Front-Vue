<template>
  <div class="bg-neutral-100 min-h-screen pb-40 pt-60">
    <WrapperComponent></WrapperComponent>
  </div>
</template>

<script setup>
import { watchEffect, ref } from "vue";

import { WrapperComponent } from "@/components";

import { getUserBlogs } from "@/services";

import { useUserStore } from "@/stores";

const blogs = ref([]);

const user = useUserStore();

const getBlogs = async () => {
  const data = await getUserBlogs();

  blogs.value = data.data;
};

watchEffect(() => {
  if (user.user) {
    getBlogs();
  }
});
</script>
