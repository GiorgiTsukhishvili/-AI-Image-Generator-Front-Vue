<template>
  <div v-if="blogInfo" class="bg-neutral-100 min-h-screen py-40">
    <WrapperComponent>
      <div class="w-full flex items-start md:flex-row flex-col">
        <img
          :src="blogInfo.user.image"
          :alt="blogInfo.user.name + 'image'"
          class="w-20 h-20 rounded-full"
        />
        <div class="md:ml-10 mt-10 md:mt-0">
          <div
            class="md:border-l-[3px] border-t-[3px] md:border-t-0 md:pl-10 pt-10 md:pt-0 border-black"
          >
            <h3 class="md:text-xl text-lg font-medium mb-2">
              {{ formatDate(blogInfo.created_at) }}
            </h3>
            <RouterLink
              :to="{ name: 'user', params: { name: blogInfo.user.name } }"
              class="font-semibold md:text-2xl text-xl"
            >
              {{ blogInfo.user.name }}
            </RouterLink>
          </div>
          <div class="flex items-center gap-3 my-8">
            <h3 class="md:text-xl text-lg font-medium">Collection:</h3>
            <RouterLink
              :to="{
                name: 'collection',
                params: { user: blogInfo.user.name },
                query: { collection: blogInfo.collection.id },
              }"
              class="md:text-xl text-lg font-medium"
              >{{ blogInfo.collection.name }}</RouterLink
            >
          </div>
          <h1 class="mt-10 font-bold md:text-3xl text-2xl">
            {{ blogInfo.title }}
          </h1>
          <img
            :src="blogInfo.image"
            alt="blog image"
            class="h-[600px] mt-10 w-full object-cover cursor-pointer"
            @click="() => (modals.imageWindow = true)"
          />
          <p
            class="md:text-2xl text-xl font-medium mt-20 pt-20 border-t-2 border-gray-400"
          >
            {{ blogInfo.description }}
          </p>

          <div class="mt-20">
            <div class="flex gap-5 items-center">
              <LikeIcon />
              <h3 class="md:text-2xl text-xl font-medium">
                {{ blogInfo.likes.length }} Likes
              </h3>
            </div>
            <button
              class="text-xl font-bold mt-4"
              @click="like"
              v-if="user.user !== null"
            >
              Like Blog
            </button>
          </div>

          <ul class="mt-20 pt-20 border-t-2 border-gray-400">
            <BlogComment
              v-for="comment in slicedComments"
              :key="comment.id"
              :comment="comment.comment"
              :user="comment.user"
              :date="comment.created_at"
            />
          </ul>
          <button
            @click="() => (modals.isCommentsOpen = !modals.isCommentsOpen)"
            class="md:text-2xl text-lg font-medium mt-10 mx-auto block"
            v-if="blogInfo.comments.length > 3"
          >
            {{ modals.isCommentsOpen ? "Show Less" : "Show More" }}
          </button>
        </div>
      </div>
    </WrapperComponent>
  </div>
  <div v-if="modals.imageWindow" class="fixed top-0 left-0 h-screen w-screen">
    <div
      class="bg-black absolute top-0 left-0 h-screen w-screen bg-opacity-60 blur-xl"
      @click="() => (modals.imageWindow = false)"
    />
    <img
      :src="blogInfo.image"
      alt="blog image"
      class="w-auto h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 md:p-20"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useUserStore } from "@/stores";

import { WrapperComponent, LikeIcon, BlogComment } from "@/components";

import { getSingleBlog, getCSRF, likeBlog } from "@/services";

import { formatDate } from "@/helpers";

const user = useUserStore();

const {
  params: { id },
} = useRoute();
const { push } = useRouter();

const blogInfo = ref();
const modals = ref({ imageWindow: false, isCommentsOpen: false });

const slicedComments = computed(() =>
  modals.value.isCommentsOpen
    ? blogInfo.value.comments
    : blogInfo.value.comments.slice(0, 3)
);

const like = async () => {
  try {
    await getCSRF();
    const data = await likeBlog({ user_id: user.user.id, blog_id: 24 });
    if (data.data.message === "Blog liked successfully") {
      blogInfo.value.likes.push({
        id: 38,
        user_id: user.id,
        blog_id: 24,
      });
    } else {
      blogInfo.value.likes = blogInfo.value.likes.filter(
        (like) => like.user_id !== user.user.id
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const getData = async (id) => {
  try {
    await getCSRF();
    const data = await getSingleBlog(id);

    blogInfo.value = data.data;
  } catch (err) {
    push("/notFound");
  }
};

onMounted(() => {
  getData(id);
});
</script>
