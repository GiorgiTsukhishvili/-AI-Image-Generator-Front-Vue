<template>
  <RouterLink
    :to="{ name: 'blog', params: { id: props.id } }"
    class="flex justify-start items-center flex-col gap-10 flex-1 min-w-[300px] max-w-[600px]"
  >
    <img
      :src="props.image"
      alt="blog image"
      class="h-[300px] w-full object-cover rounded-2xl"
    />

    <h2 class="md:text-2xl text-xl font-bold mt-5">
      {{ props.title }}
    </h2>
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  image: { required: true, type: String },
  title: { required: true, type: String },
  id: { required: true, type: Number },
});
</script>
