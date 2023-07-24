<template>
  <NavbarComponent />
  <RouterView />
</template>

<script setup>
import { onBeforeMount } from "vue";

import { NavbarComponent } from "@/components";

import { getCSRF, getLoggedInUser } from "@/services";

import { useUserStore } from "@/stores";

const { setUserInfo } = useUserStore();

const getUserInforMation = async () => {
  try {
    await getCSRF();
    const data = await getLoggedInUser();
    setUserInfo(data.data);
  } catch (err) {
    setUserInfo(null);
  }
};

onBeforeMount(() => {
  getUserInforMation();
});
</script>
