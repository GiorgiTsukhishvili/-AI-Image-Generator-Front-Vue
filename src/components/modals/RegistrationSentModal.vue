<template>
  <div
    class="fixed top-0 left-0 w-screen min-h-screen flex justify-center scrollbar-hide items-center overflow-scroll z-50"
  >
    <div
      class="bg-black bg-opacity-20 fixed top-0 left-0 w-screen min-h-screen"
      @click="emits('changeModal', '')"
    />
    <div
      class="bg-white scrollbar-hide rounded-lg shadow-2xl md:max-w-[700px] md:w-full pb-10 h-screen w-screen md:min-h-fit overflow-scroll relative md:h-auto z-10"
    >
      <div
        class="absolute top-10 right-10 md:hidden"
        @click="emits('changeModal', '')"
      >
        <CloseIcon />
      </div>
      <div
        class="flex items-center gap-10 justify-center pt-10 w-full h-full px-10 md:flex-row flex-col"
      >
        <AirplaneIcon />
        <h2 class="text-3xl text-center">
          Registration link sent, please check your email
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AirplaneIcon } from "@/components";

const emits = defineEmits(["changeModal"]);
</script>
