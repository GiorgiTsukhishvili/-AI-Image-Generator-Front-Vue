<template>
  <div
    class="fixed top-0 left-0 w-screen min-h-screen flex justify-center scrollbar-hide items-center overflow-scroll z-50"
  >
    <div
      class="bg-black bg-opacity-20 fixed top-0 left-0 w-screen min-h-screen"
      @click="emits('sentModalUpdate', '')"
    />
    <div
      class="bg-white scrollbar-hide rounded-lg shadow-2xl md:max-w-[600px] md:w-full pb-10 h-screen w-screen md:min-h-fit overflow-scroll relative md:h-auto z-10"
    >
      <div
        class="absolute top-10 right-10 md:hidden"
        @click="emits('sentModalUpdate', '')"
      >
        <CloseIcon />
      </div>
      <h1 class="md:px-10 px-5 pt-16 md:text-4xl text-2xl font-bold">
        Reset Password
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

import { useRoute } from "vue-router";

import { FormInput, CloseIcon } from "@/components";
import { axios } from "@/services";

const emits = defineEmits(["sentModalUpdate"]);

const registerFields = [
  {
    name: "password",
    type: "password",
    placeholder: "Input Your Password",
    rules: "required|min:8",
  },
  {
    name: "password_confirmation",
    type: "password",
    placeholder: "Input Repeat Password",
    rules: "required|min:8",
  },
];

const inputFields = ref(registerFields);

const { query } = useRoute();

const handleSubmit = async (values) => {
  const link = `${query["reset-link"]}&token=${query.token}&signature=${query.signature}`;
  try {
    await axios.post(link, values);

    emits("sentModalUpdate", "success", "Password updated successfully");
  } catch (err) {
    console.log(err);
  }
};
</script>
