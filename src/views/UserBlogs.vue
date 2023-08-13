<template>
  <div class="bg-neutral-100 min-h-screen pb-40 pt-60">
    <WrapperComponent></WrapperComponent>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

import { WrapperComponent } from "@/components";

import { getUserBlogs } from "@/services";

const getBlogs = async () => {
  const data = await getUserBlogs();

  console.log(data.data);
};

onMounted(() => getBlogs());
</script>
