<template>
  <div class="h-20 shadow-2xl w-full bg-neutral-100 relative">
    <WrapperComponent>
      <div class="flex items-center h-20 justify-between w-full">
        <RouterLink to="/" class="font-bold md:text-2xl text-xl uppercase"
          >Image blog</RouterLink
        >
        <div>
          <div class="flex items-center gap-4">
            <button
              class="bg-none text-blue-600 border border-blue-600 rounded-md text-lg font-bold px-4 py-1"
            >
              Login
            </button>
            <button
              class="text-white bg-blue-600 border border-blue-600 rounded-md text-lg font-bold px-4 py-1"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </WrapperComponent>
  </div>
  <LoginForm v-if="whichModalOpen === 'login'" />
</template>

<script setup>
import { RouterLink } from "vue-router";
import { LoginForm, WrapperComponent } from "@/components";
import { ref } from "vue";

const whichModalOpen = ref("");
</script>
