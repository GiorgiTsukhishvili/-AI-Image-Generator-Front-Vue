<template>
  <div class="bg-neutral-100 min-h-screen pb-40 pt-60">
    <WrapperComponent></WrapperComponent>
  </div>
</template>

<script setup>
import { WrapperComponent } from "@/components";

import { useUserStore } from "@/stores";

const user = useUserStore();

import { getUserCollections } from "@/services";
import { watchEffect } from "vue";

const userCollections = async () => {
  const data = await getUserCollections();

  console.log(data.data);
};

watchEffect(() => {
  if (user.user) {
    userCollections();
  }
});
</script>
