<template>
  <div></div>
</template>

<script setup>
import { useRoute } from "vue-router";

const {
  params: { user, collection },
} = useRoute();

console.log(user, collection);
</script>
