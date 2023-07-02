<template>
  <div class="bg-neutral-100 h-screen">
    <WrapperComponent></WrapperComponent>
  </div>
</template>

<script setup>
import { WrapperComponent } from "@/components";
import { onMounted } from "vue";
import { getAllBlogs, getCSRF } from "@/services";
import { ref } from "vue";

const blogs = ref([]);

onMounted(() => {
  const blogsData = async () => {
    await getCSRF();
    const data = await getAllBlogs();
    blogs.value = data.data.blogs;
  };

  blogsData();
});
</script>
