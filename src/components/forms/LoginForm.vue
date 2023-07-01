<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center"
  >
    <div
      class="bg-black bg-opacity-20 fixed top-0 left-0 w-screen h-screen"
      @click="emits('changeModal', '')"
    />
    <div
      class="bg-white rounded-lg shadow-2xl md:max-w-[600px] md:w-full h-screen w-screen md:h-auto z-10"
    >
      <div
        class="absolute top-10 right-10 md:hidden"
        @click="emits('changeModal', '')"
      >
        <CloseIcon />
      </div>
      <div class="flex items-center gap-10 w-full justify-center pt-10">
        <button class="text-2xl text-gray-700 border-b-4 border-b-gray-700">
          Login
        </button>
        <button
          class="text-2xl text-gray-700 pb-1"
          @click="emits('changeModal', 'register')"
        >
          Sign Up
        </button>
      </div>
      <h1 class="px-10 pt-16 md:text-4xl text-2xl font-bold">
        Login Into Account
      </h1>
      <Form
        @submit="handleSubmit"
        class="md:px-10 px-5 py-10 flex flex-col gap-6"
      >
        <ul class="w-full">
          <FormInput
            v-for="(inputField, i) in inputFields"
            :key="i"
            :name="inputField.name"
            :type="inputField.type"
            :rules="inputField.rules"
            :placeholder="inputField.placeholder"
          />
        </ul>
        <button
          type="submit"
          class="bg-green-500 text-white py-2 px-4 md:inline block w-full md:max-w-[160px] rounded-md uppercase hover:bg-green-600 duration-300 text-lg"
        >
          Submit
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { ref } from "vue";
import { FormInput, CloseIcon } from "@/components";

const emits = defineEmits(["changeModal"]);

const loginFields = [
  {
    name: "username",
    type: "text",
    placeholder: "Input Your Username",
    rules: "required|min:3",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Input Your Password",
    rules: "required|min:8",
  },
];

const inputFields = ref(loginFields);

const handleSubmit = (values) => {
  console.log(values);
};
</script>
