<template>
  <div
    class="md:mb-20 mb-5 bg-white shadow-xl rounded-md py-3 px-6 max-w-[850px] mx-auto w-full flex justify-between gap-5"
  >
    <div
      class="min-h-20 w-full relative"
      @focus="() => (dropdown = true)"
      @focusout="() => (dropdown = false)"
      tabindex="0"
    >
      <h2 v-if="chosenTags.length === 0" class="text-black text-xl font-medium">
        Add Tags...
      </h2>
      <ul
        class="absolute w-full h-[400px] scroll left-0 top-16 overflow-y-scroll bg-white rounded-md shadow-xl duration-300 origin-top px-4 py-5 flex flex-col gap-2"
        :style="{ transform: dropdown ? 'scaleY(1)' : 'scaleY(0)' }"
      >
        <li v-for="tag in tags" :key="tag.id" class="text-lg font-medium">
          {{ tag.name }}
        </li>
      </ul>
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
