<template>
  <div
    class="flex justify-between w-full items-center lg:flex-row flex-col gap-10"
  >
    <img
      :src="props.blog.image"
      alt="blog image"
      class="h-[500px] w-full flex-1 object-fit rounded-2xl"
    />
    <div class="flex-1 flex flex-col items-start self-stretch">
      <ul class="flex flex-wrap items-center gap-2">
        <li
          v-for="tag in props.blog.tags"
          :key="tag.id"
          :style="randColor()"
          class="px-4 py-2 rounded-md flex justify-center items-center"
        >
          {{ tag.name }}
        </li>
      </ul>
      <h2 class="md:text-4xl text-3xl font-bold mt-5">
        {{ props.blog.title }}
      </h2>
      <RouterLink class="mt-5 md:text-xl text-gray-500" :to="'#'">
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
          <h4 class="font-bold md:text-xl">By : {{ props.blog.user.name }}</h4>
          <p class="text-gray-500">
            {{ calculateData(props.blog.created_at) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowRightIcon } from "@/components";
import { RouterLink } from "vue-router";
import { calculateData, randColor } from "@/helpers";

const props = defineProps({
  blog: { type: Object, required: true },
});
</script>
