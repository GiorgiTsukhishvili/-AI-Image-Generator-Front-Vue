<template>
  <div class="bg-neutral-100 min-h-screen flex flex-col justify-start pb-40">
    <WrapperComponent>
      <div class="flex flex-col gap-20 pt-20 w-full">
        <TextSearch />
        <TagSearch />
        <ul class="w-full flex flex-wrap gap-16" v-if="blogs.length > 0">
          <li
            v-for="(blog, i) in blogs"
            :key="blog.id"
            :class="{ 'flex-1 min-w-[300px] max-w-[600px]': i !== 0 }"
          >
            <BlogLarge v-if="i === 0" :blog="blog" />
            <BlogSmall v-else :blog="blog" />
          </li>
        </ul>
        <h2 v-else class="mx-auto text-4xl font-semibold">
          No Blogs Were Found...
        </h2>
      </div>
    </WrapperComponent>
    <button
      @click="() => blogsData(route.query)"
      class="py-40 text-2xl font-bold"
      v-if="currentPage <= lastPage"
    >
      Load More
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useRoute } from "vue-router";

import {
  WrapperComponent,
  BlogLarge,
  BlogSmall,
  TextSearch,
  TagSearch,
} from "@/components";

import { getAllBlogs, getCSRF } from "@/services";

const blogs = ref([]);
const currentPage = ref(1);
const lastPage = ref(0);

const route = useRoute();

const blogsData = async (query) => {
  await getCSRF();
  const data = await getAllBlogs(currentPage.value, query);

  blogs.value = [blogs.value, data.data.blogs.data].flat();

  currentPage.value++;

  lastPage.value = data.data.blogs.last_page;
};

onMounted(() => {
  blogsData(route.query);
});
</script>
