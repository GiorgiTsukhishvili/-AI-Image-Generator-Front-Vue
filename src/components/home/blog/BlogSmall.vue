<template>
  <div class="flex justify-between items-center flex-col gap-10">
    <RouterLink
      :to="{ name: 'blog', params: { id: props.blog.id } }"
      class="w-full"
    >
      <img
        :src="props.blog.image"
        alt="blog image"
        class="h-[300px] w-full object-fit rounded-2xl"
      />
    </RouterLink>
    <div class="flex flex-col items-start self-stretch">
      <ul class="flex flex-wrap items-center gap-2">
        <TagCommon
          v-for="tag in props.blog.tags"
          :key="tag.id"
          :name="tag.name"
        />
      </ul>
      <RouterLink
        class="md:text-3xl text-2xl font-bold mt-5"
        :to="{ name: 'blog', params: { id: props.blog.id } }"
      >
        {{ props.blog.title }}
      </RouterLink>
      <RouterLink
        class="mt-5 md:text-xl text-gray-500"
        :to="{ name: 'blog', params: { id: props.blog.id } }"
      >
        {{ props.blog.description.slice(0, 180) }}...
        <ArrowRightIcon />
      </RouterLink>
      <div class="mt-5 flex items-center gap-5 w-full">
        <img
          :src="props.blog.user.image"
          alt="user image"
          class="h-[60px] w-[60px] object-fit rounded-2xl"
        />
        <div class="self-start">
          <RouterLink
            class="font-bold md:text-xl"
            :to="{ name: 'user', params: { name: props.blog.user.name } }"
            >By : {{ props.blog.user.name }}</RouterLink
          >
          <p class="text-gray-500">
            {{ calculateData(props.blog.created_at) }}
          </p>
        </div>
      </div>
      <div class="flex gap-4 items-center mt-5">
        <span class="flex gap-2 items-center text-xl">
          <LikeIcon /> {{ props.blog.likes_count }}
        </span>
        <span class="flex gap-2 items-center text-xl">
          <CommentIcon /> {{ props.blog.comments_count }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRightIcon, LikeIcon, CommentIcon, TagCommon } from "@/components";

import { RouterLink } from "vue-router";

import { calculateData } from "@/helpers";

const props = defineProps({
  blog: { type: Object, required: true },
});
</script>
