<template>
  <div></div>
</template>

<script setup>
const props = defineProps({
  subscriber_id: { required: true, type: Number },
  subscribe_to: { required: true, type: Number },
  subscribers: { required: true },
});

const emits = defineEmits(["comment"]);

console.log(props);
</script>
