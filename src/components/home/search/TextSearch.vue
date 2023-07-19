<template>
  <form
    class="flex items-center justify-center"
    v-on:submit.prevent="changeSearch"
  >
    <input
      v-model="search"
      class="py-3 px-6 bg-white text-black placeholder:text-gray-700 focus:ring-0 focus:border-black focus:outline-none border-black border-2 rounded-l-full max-w-[700px] w-full"
      placeholder="Search Blog"
    />
    <button
      class="text-xl bg-slate-600 rounded-r-full text-white self-stretch pr-6 pl-7 relative -translate-x-1 flex items-center"
      type="submit"
    >
      Search
    </button>
  </form>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

import { ref } from "vue";

const { query, path } = useRoute();
const { push, go } = useRouter();

const search = ref(query.search ?? "");

const changeSearch = () => {
  push({ path, query: { ...query, search: search.value } }).then(() => {
    go();
  });
};
</script>
