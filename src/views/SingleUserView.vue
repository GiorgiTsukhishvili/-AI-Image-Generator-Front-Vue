<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";

import { useRoute, useRouter } from "vue-router";

import { getDesiredUser, getCSRF } from "@/services";

const {
  params: { name },
} = useRoute();
const { push } = useRouter();

const getUserInfo = async (name) => {
  try {
    await getCSRF();
    const data = await getDesiredUser(name);
    console.log(data.data);
  } catch (err) {
    push("/notFound");
  }
};

onMounted(() => {
  getUserInfo(name);
});
</script>
