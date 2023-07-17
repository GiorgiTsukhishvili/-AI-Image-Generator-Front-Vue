<template>
  <li class="border-b border-b-gray-400 last:border-b-0 py-10">
    <div class="flex gap-5">
      <RouterLink :to="{ name: 'user', params: { name: user.name } }">
        <img
          :src="props.user.image"
          alt="commenter image"
          class="w-16 h-16 rounded-full"
        />
      </RouterLink>
      <div class="flex flex-col justify-between">
        <RouterLink
          :to="{ name: 'user', params: { name: user.name } }"
          class="md:text-xl text-lg font-semibold"
        >
          {{ props.user.name }}
        </RouterLink>
        <h4 class="md:text-lg font-medium">
          {{ calculateData(props.date) }}
        </h4>
      </div>
    </div>
    <p class="mt-10 md:text-xl text-lg">{{ props.comment }}</p>
  </li>
</template>

<script setup>
import { calculateData } from "@/helpers";

const props = defineProps({
  user: {
    required: true,
  },
  comment: { required: true },
  date: { required: true },
});
</script>
