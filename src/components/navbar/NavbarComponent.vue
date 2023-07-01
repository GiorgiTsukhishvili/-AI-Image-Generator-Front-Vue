<template>
  <div class="h-20 shadow-2xl w-full bg-neutral-100">
    <WrapperComponent>
      <div class="flex items-center h-20 justify-between">
        <RouterLink to="/" class="font-bold md:text-2xl text-xl uppercase"
          >Image blog</RouterLink
        >
        <div>
          <button
            class="bg-none text-blue-600 border border-blue-600 rounded-md text-xl font-bold"
          >
            Login
          </button>
          <button>Sign Up</button>
        </div>
      </div>
    </WrapperComponent>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import WrapperComponent from "../ui/WrapperComponent.vue";
</script>
