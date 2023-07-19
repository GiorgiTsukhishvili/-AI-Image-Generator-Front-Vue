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
      <h2
        v-if="chosenTags.length === 0"
        class="text-black text-xl font-medium py-1"
      >
        Add Tags...
      </h2>
      <ul v-else class="flex gap-2 flex-wrap items-center">
        <li
          v-for="(chosenTag, i) in chosenTags"
          :key="i"
          class="bg-gray-300 rounded-md px-2 py-1 text-xl font-medium"
          @click="() => addOrRemoveTag(chosenTag)"
        >
          {{ chosenTag }}
        </li>
      </ul>
      <div class="relative">
        <ul
          class="absolute w-[110%] h-[400px] z-10 scroll left-0 top-6 overflow-y-scroll bg-white rounded-md shadow-2xl duration-300 origin-top py-5 flex flex-col gap-2"
          :style="{ transform: dropdown ? 'scaleY(1)' : 'scaleY(0)' }"
        >
          <li
            v-for="tag in tags"
            :key="tag.id"
            class="text-lg font-medium px-4 cursor-pointer py-1"
            @click="() => addOrRemoveTag(tag.name)"
            :class="{ 'bg-gray-300': chosenTags.includes(tag.name) }"
          >
            {{ tag.name }}
          </li>
        </ul>
      </div>
    </div>
    <button class="text-xl font-semibold" @click="filter">Filter</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useRoute, useRouter } from "vue-router";

import { getAllTags, getCSRF } from "@/services";

const { query, path } = useRoute();
const { push, go } = useRouter();

const tags = ref([]);
const chosenTags = ref(query.tags ? query.tags.split(",") : []);
const dropdown = ref(false);

const addOrRemoveTag = (tag) => {
  if (chosenTags.value.includes(tag)) {
    return (chosenTags.value = chosenTags.value.filter((ct) => ct !== tag));
  }

  chosenTags.value.push(tag);
};

const filter = () => {
  push({ path, query: { ...query, tags: chosenTags.value.join(",") } }).then(
    () => {
      go();
    }
  );
};

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
