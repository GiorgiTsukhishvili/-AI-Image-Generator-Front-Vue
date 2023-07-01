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
              @click="() => changeModal('login')"
            >
              Login
            </button>
            <button
              @click="() => changeModal('register')"
              class="text-white bg-blue-600 border border-blue-600 rounded-md text-lg font-bold px-4 py-1"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </WrapperComponent>
  </div>
  <LoginForm
    v-if="whichModalOpen === 'login'"
    @changeModal="(modalState) => changeModal(modalState)"
  />
  <RegisterForm
    v-if="whichModalOpen === 'register'"
    @changeModal="(modalState) => changeModal(modalState)"
  />
</template>

<script setup>
import { RouterLink } from "vue-router";
import { LoginForm, WrapperComponent, RegisterForm } from "@/components";
import { ref, watchEffect } from "vue";

const whichModalOpen = ref("");

const changeModal = (modal) => (whichModalOpen.value = modal);

watchEffect(() => {
  if (whichModalOpen.value !== "") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
});
</script>
