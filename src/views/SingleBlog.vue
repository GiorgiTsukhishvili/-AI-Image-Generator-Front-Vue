<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { getSingleBlog } from "@/services";

const { params } = useRoute();

const getData = async (id) => {
  const data = await getSingleBlog(id);
};

onMounted(() => {
  getData(params.id);
});
</script>
