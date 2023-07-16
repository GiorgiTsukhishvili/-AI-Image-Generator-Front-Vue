<template>
  <div></div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useRoute, useRouter } from "vue-router";

import { getCSRF, getDesiredCollection } from "@/services";

const {
  params: { user },
  query,
} = useRoute();
const { push } = useRouter();

const collectionInfo = ref({});

const getCollection = async (user, query) => {
  try {
    await getCSRF();
    const data = await getDesiredCollection(user, query);

    collectionInfo.value = data.data;
  } catch (err) {
    push("/notFound");
  }
};

onMounted(() => {
  getCollection(user, query);
});
</script>
