<template>
  <div v-if="collectionInfo" class="bg-neutral-100 min-h-screen py-40">
    <WrapperComponent>
      <div>
        <div class="flex items-center gap-7 mb-10">
          <img
            :src="collectionInfo.user.image"
            :alt="collectionInfo.user.name"
            class="w-24 h-24 rounded-full"
          />
          <div class="flex justify-between items-center w-full">
            <RouterLink
              :to="{ name: 'user', params: { name: collectionInfo.user.name } }"
            >
              <h2 class="text-2xl font-bold">{{ collectionInfo.user.name }}</h2>
              <h3 class="mt-5 text-xl font-medium">
                <span class="font-semibold"
                  >@{{ collectionInfo.user.name }}</span
                >
                Subscribers: {{ collectionInfo.user.subscribers.length }} Blogs:
                {{ collectionInfo.user.blogs_count }}
              </h3>
            </RouterLink>
            <SubscribeCommon
              v-if="
                loginUser.user !== null &&
                loginUser.user.id !== collectionInfo.user.id
              "
              @subscribe="subscribe"
              :subscriber_id="loginUser.user.id"
              :subscribe_to="collectionInfo.user.id"
              :subscribers="collectionInfo.user.subscribers"
            />
          </div>
        </div>
        <h1 class="md:text-3xl text-2xl font-semibold">
          Collection : {{ collectionInfo.name }}
        </h1>
        <ul class="mt-16 flex flex-wrap gap-20">
          <CollectionBlog
            v-for="blog in collectionInfo.blogs"
            :key="blog.id"
            :title="blog.title"
            :image="blog.image"
            :id="blog.id"
          />
        </ul>
      </div>
    </WrapperComponent>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useRoute, useRouter } from "vue-router";

import { getCSRF, getDesiredCollection } from "@/services";

import {
  WrapperComponent,
  CollectionBlog,
  SubscribeCommon,
} from "@/components";

import { useUserStore } from "@/stores";

const loginUser = useUserStore();

const {
  params: { user },
  query,
} = useRoute();
const { push } = useRouter();

const collectionInfo = ref();

const getCollection = async (user, query) => {
  try {
    await getCSRF();
    const data = await getDesiredCollection(user, query);
    console.log(data.data);
    collectionInfo.value = data.data;
  } catch (err) {
    push("/notFound");
  }
};

const subscribe = (removeOrAdd) => {
  if (removeOrAdd) {
    collectionInfo.value.user.subscribers.push({
      user_id: collectionInfo.value.user.id,
      subscribed_id: loginUser.user.id,
    });
  } else {
    collectionInfo.value.user.subscribers =
      collectionInfo.value.user.subscribers.filter(
        (sub) => sub.subscribed_id !== loginUser.user.id
      );
  }
};

onMounted(() => {
  getCollection(user, query);
});
</script>
