<template>
  <li
    :style="randColor()"
    class="px-4 py-2 rounded-md flex justify-center items-center z-[3] relative cursor-pointer"
    @click="changeLink"
  >
    {{ props.name }}
  </li>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

import { randColor } from "@/helpers";

const { push, go } = useRouter();
const { path } = useRoute();

const props = defineProps({ name: { required: true } });

const changeLink = () =>
  push({ path, query: { tags: props.name } }).then(() => go());
</script>
