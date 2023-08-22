<template>
  <div class="bg-neutral-100 min-h-screen pb-40 pt-60">
    <WrapperComponent>
      <h1 class="md:text-3xl text-2xl font-semibold">My Blogs:</h1>
      <ul class="mt-16 flex flex-wrap gap-20">
        <CollectionBlog
          v-for="blog in blogs"
          :key="blog.id"
          :title="blog.title"
          :image="blog.image"
          :id="blog.id"
        />
      </ul>
    </WrapperComponent>
  </div>
</template>

<script setup>
import { watchEffect, ref } from "vue";

import { WrapperComponent, CollectionBlog } from "@/components";

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
