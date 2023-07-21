<template>
  <img
    v-if="userInfo && userInfo.background_image"
    :src="userInfo.background_image"
    alt="background image"
    class="absolute top-20 left-0 w-full h-[320px] object-cover"
  />
  <div v-if="userInfo" class="bg-neutral-100 min-h-screen pb-40 pt-60">
    <WrapperComponent>
      <div class="flex flex-col items-start w-full">
        <div class="flex gap-10 sm:flex-row flex-col">
          <img
            :src="userInfo.image"
            alt="user image"
            class="w-44 h-44 rounded-full z-10"
          />
          <div class="z-10 flex flex-col justify-end">
            <h1 class="md:text-3xl text-2xl font-semibold">
              {{ userInfo.name }}
            </h1>
            <h3 class="md:text-2xl text-lg font-medium mt-3">
              <span class="font-semibold">@{{ userInfo.name }}</span>
              Subscribers: {{ userInfo.subscribers_count }} Blogs:
              {{ userInfo.blogs_count }}
            </h3>
          </div>
        </div>
        <h2
          class="mt-20 pb-10 mb-10 border-b-2 border-gray-500 w-full md:text-3xl text-2xl"
        >
          Collections:
        </h2>
        <h1
          v-if="userInfo.collections.length === 0"
          class="md:text-3xl text-2xl font-semibold"
        >
          User Has No Collections So Far
        </h1>
        <ul v-else class="flex flex-wrap gap-10 justify-center">
          <RouterLink
            v-for="collection in userInfo.collections"
            :key="collection.id"
            :to="{
              name: 'collection',
              params: { user: userInfo.name },
              query: { collection: collection.id },
            }"
          >
            <img
              :src="
                collection.image
                  ? collection.image
                  : '/assets/imgs/folder-icon.png'
              "
              alt="collection image"
              class="w-48 h-48 object-cover"
            />
            <h2
              class="text-center md:text-xl text-lg font-medium max-w-[180px] my-5"
            >
              {{ collection.name }}
            </h2>
            <h3
              class="text-center md:text-xl text-lg font-medium max-w-[180px]"
            >
              Total blogs: {{ collection.blogs_count }}
            </h3>
          </RouterLink>
        </ul>
      </div>
    </WrapperComponent>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useRoute, useRouter } from "vue-router";

import { getDesiredUser, getCSRF } from "@/services";

import { WrapperComponent } from "@/components";

const userInfo = ref();

const {
  params: { name },
} = useRoute();
const { push } = useRouter();

const getUserInfo = async (name) => {
  try {
    await getCSRF();
    const data = await getDesiredUser(name);

    userInfo.value = data.data;
  } catch (err) {
    push("/notFound");
  }
};

onMounted(() => {
  getUserInfo(name);
});
</script>
