<template>
  <h1 class="md:px-10 px-5 pt-16 md:text-4xl text-2xl font-bold">
    Update Email
  </h1>
  <Form
    @submit="handleSubmit"
    class="md:px-10 px-5 py-10 flex flex-col gap-6 max-w-[600px] w-full"
    v-if="updateEmail"
    ><ul class="w-full">
      <FormInput
        name="email"
        type="email"
        rules="required|min:5|email"
        placeholder="Input Your email"
      />
    </ul>
    <button
      type="submit"
      class="bg-green-500 text-white py-2 px-4 md:inline block w-full md:max-w-[160px] rounded-md uppercase hover:bg-green-600 duration-300 text-lg"
    >
      Submit
    </button></Form
  >
  <ul
    v-else
    class="md:px-10 px-5 py-10 flex gap-6 w-full items-center md:flex-row flex-col"
  >
    <span class="pointer-events-none max-w-[520px] w-full">
      <FormInput
        name="Email"
        type="Email"
        :placeholder="user.user.email"
        placeholderColor
    /></span>
    <button @click="() => (updateEmail = true)" class="text-lg">
      Update Email
    </button>
  </ul>
  <EmailSentModal
    v-if="modalOpen"
    @changeModal="() => (modalOpen = false)"
    text="Email Update mail was sent."
  />
</template>

<script setup>
import { ref } from "vue";
import { Form } from "vee-validate";

import { useUserStore } from "@/stores";

import { FormInput, EmailSentModal } from "@/components";

const user = useUserStore();

const updateEmail = ref(false);
const modalOpen = ref(false);

const handleSubmit = async (values) => {
  modalOpen.value = true;
};
</script>
