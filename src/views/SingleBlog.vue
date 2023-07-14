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
            <h2 class="font-semibold md:text-2xl text-xl">
              {{ blogInfo.user.name }}
            </h2>
          </div>
          <h1 class="mt-10 font-bold md:text-3xl text-2xl">
            {{ blogInfo.title }}
          </h1>
          <img
            :src="blogInfo.image"
            alt="blog image"
            class="h-[600px] mt-10 w-full object-cover cursor-pointer"
            @click="() => (imageWidow = true)"
          />
          <p
            class="md:text-xl text-xl font-medium mt-20 pt-20 border-t-2 border-gray-400"
          >
            {{ blogInfo.description }}
          </p>
        </div>
      </div>
    </WrapperComponent>
  </div>
  <div v-if="imageWidow" class="fixed top-0 left-0 h-screen w-screen">
    <div
      class="bg-black absolute top-0 left-0 h-screen w-screen bg-opacity-60 blur-xl"
      @click="() => (imageWidow = false)"
    />
    <img
      :src="blogInfo.image"
      alt="blog image"
      class="w-auto h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 md:p-20"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { WrapperComponent } from "@/components";

import { getSingleBlog } from "@/services";

import { formatDate } from "@/helpers";

const { params } = useRoute();
const { push } = useRouter();

const blogInfo = ref();
const imageWidow = ref(false);

const getData = async (id) => {
  try {
    const data = await getSingleBlog(id);

    console.log(data.data);
    blogInfo.value = data.data;
  } catch (err) {
    push("/notFound");
  }
};

onMounted(() => {
  getData(params.id);
});
</script>
