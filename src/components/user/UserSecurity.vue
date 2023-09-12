<template>
  <div class="w-full flex flex-col justify-center items-start">
    <h1 class="md:px-10 px-5 pt-16 md:text-4xl text-2xl font-bold">
      Update Password
    </h1>
    <Form
      @submit="handleSubmit"
      class="md:px-10 px-5 py-10 flex flex-col gap-6 max-w-[600px] w-full"
      v-if="updatePassword"
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
    <ul
      v-else
      class="md:px-10 px-5 py-10 flex gap-6 w-full items-center md:flex-row flex-col"
    >
      <span class="pointer-events-none max-w-[520px] w-full">
        <FormInput name="password" type="password" placeholder="********"
      /></span>
      <button @click="() => (updatePassword = true)" class="text-lg">
        Update Password
      </button>
    </ul>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { ref } from "vue";

import { userPassword } from "@/services";

import { FormInput } from "@/components";

const registerFields = [
  {
    name: "current_password",
    type: "password",
    placeholder: "Input Your Current Password",
    rules: "required|min:8",
  },
  {
    name: "new_password",
    type: "password",
    placeholder: "Input Your New Password",
    rules: "required|min:8",
  },
  {
    name: "new_password_confirmation",
    type: "password",
    placeholder: "Input Repeat New Password",
    rules: "required|min:8|confirmed:new_password",
  },
];

const inputFields = ref(registerFields);

const updatePassword = ref(false);

const handleSubmit = async (values) => {
  try {
    await userPassword(values);
    updatePassword.value = false;
  } catch (err) {
    console.log(err);
  }
};
</script>
