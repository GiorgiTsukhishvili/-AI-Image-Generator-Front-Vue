<template>
  <div class="bg-neutral-100 min-h-screen flex flex-col justify-center pb-40">
    <WrapperComponent>
      <ul class="w-full pt-40 flex flex-wrap gap-16">
        <li
          v-for="(blog, i) in blogs"
          :key="blog.id"
          :class="{ 'flex-1 min-w-[300px] max-w-[600px]': i !== 0 }"
        >
          <BlogLarge v-if="i === 0" :blog="blog" />
          <BlogSmall v-else :blog="blog" />
        </li>
      </ul>
    </WrapperComponent>
    <button
      @click="blogsData"
      class="py-40 text-2xl font-bold"
      v-if="currentPage <= lastPage"
    >
      Load More
    </button>
  </div>
</template>

<script setup>
import { WrapperComponent, BlogLarge, BlogSmall } from "@/components";
import { onMounted } from "vue";
import { getAllBlogs, getCSRF } from "@/services";
import { ref } from "vue";

const blogs = ref([]);
const currentPage = ref(1);
const lastPage = ref(0);

const blogsData = async () => {
  await getCSRF();
  const data = await getAllBlogs(currentPage.value);
  blogs.value = [blogs.value, data.data.blogs.data].flat();
  currentPage.value++;
  lastPage.value = data.data.blogs.last_page;
};

onMounted(() => {
  blogsData();
});
</script>
