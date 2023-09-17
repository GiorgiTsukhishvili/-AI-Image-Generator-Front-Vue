<template>
  <div class="bg-neutral-100 min-h-screen pb-40 pt-60">
    <WrapperComponent>
      <div>
        <h1 class="md:text-4xl text-2xl font-semibold">My Blogs:</h1>
        <ul class="mt-16 flex flex-wrap gap-20">
          <li
            v-for="blog in blogs"
            :key="blog.id"
            class="flex-1 min-w-[300px] max-w-[600px]"
          >
            <div class="flex justify-end gap-5 mb-6">
              <span @click="() => (modalOpen = true)">
                <EditIcon collection />
              </span>
              <span
                @click="() => deleteChoseBlog(blog.id)"
                class="cursor-pointer"
              >
                <DeleteIcon />
              </span>
            </div>
            <CollectionBlog
              :title="blog.title"
              :image="blog.image"
              :id="blog.id"
            />
          </li>
        </ul>
      </div>
    </WrapperComponent>
  </div>
  <BlogModal v-if="modalOpen" @changeModal="(value) => (modalOpen = value)" />
</template>

<script setup>
import { watchEffect, ref } from "vue";

import {
  WrapperComponent,
  CollectionBlog,
  DeleteIcon,
  EditIcon,
  BlogModal,
} from "@/components";

import { getUserBlogs, deleteBlog } from "@/services";

import { useUserStore } from "@/stores";

const blogs = ref([]);
const modalOpen = ref(false);

const user = useUserStore();

const getBlogs = async () => {
  const data = await getUserBlogs();

  blogs.value = data.data;
};

const deleteChoseBlog = async (id) => {
  try {
    await deleteBlog(id);
    blogs.value = blogs.value.filter((blog) => blog.id !== id);
  } catch (err) {
    console.log(err);
  }
};

watchEffect(() => {
  if (user.user) {
    getBlogs();
  }
});
</script>
