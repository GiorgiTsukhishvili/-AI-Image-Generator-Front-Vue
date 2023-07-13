<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSingleBlog } from "@/services";

const { params } = useRoute();
const { push } = useRouter();

const getData = async (id) => {
  try {
    const data = await getSingleBlog(id);
    console.log(data);
  } catch (err) {
    push("/notFound");
  }
};

onMounted(() => {
  getData(params.id);
});
</script>
