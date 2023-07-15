<template>
  <img
    v-if="userInfo && userInfo.background_image"
    :src="userInfo.background_image"
    alt="background image"
    class="absolute top-20 left-0 w-full h-[320px] object-cover"
  />
  <div v-if="userInfo" class="bg-neutral-100 min-h-screen pb-40 pt-60">
    <WrapperComponent>
      <div class="flex gap-10">
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
            Subscribers: {{ userInfo.subscribers_count }}
          </h3>
        </div>
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
    console.log(data.data);
  } catch (err) {
    push("/notFound");
  }
};

onMounted(() => {
  getUserInfo(name);
});
</script>
