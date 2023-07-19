<template>
  <div
    class="md:mb-20 mb-5 bg-white shadow-xl rounded-md py-3 px-6 max-w-[850px] mx-auto w-full flex justify-between gap-5"
  >
    <div
      class="min-h-20 w-full"
      @focus="() => (dropdown = true)"
      @focusout="() => (dropdown = false)"
      tabindex="0"
    >
      <h2 v-if="chosenTags.length === 0" class="text-black text-xl font-medium">
        Add Tags...
      </h2>
      <ul v-if="dropdown"></ul>
    </div>
    <button class="text-xl font-semibold" @click="filter">Filter</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { getAllTags, getCSRF } from "@/services";

const tags = ref([]);
const chosenTags = ref([]);
const dropdown = ref(false);

const filter = () => {};

const getTags = async () => {
  try {
    await getCSRF();

    const data = await getAllTags();

    tags.value = data.data.tags;
  } catch (err) {
    tags.value = [];
  }
};

onMounted(() => {
  getTags();
});
</script>
