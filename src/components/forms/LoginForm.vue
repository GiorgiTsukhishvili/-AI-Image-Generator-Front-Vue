<template>
  <div
    class="fixed top-0 left-0 w-screen overflow-scroll scrollbar-hide min-h-screen flex justify-center items-center z-50"
  >
    <div
      class="bg-black bg-opacity-20 fixed top-0 left-0 w-screen min-h-screen"
      @click="emits('changeModal', '')"
    />
    <div
      class="bg-white rounded-lg scrollbar-hide shadow-2xl md:max-w-[600px] md:w-full min-h-screen w-screen md:min-h-fit md:h-auto z-10 overflow-scroll"
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
      <h1 class="md:px-10 px-5 pt-16 md:text-4xl text-2xl font-bold">
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
          <li class="flex justify-between items-center">
            <div class="flex gap-2 items-center">
              <label for="remember">Remember me</label>
              <Field
                type="checkbox"
                name="remember"
                id="remember"
                value="true"
              />
            </div>
            <button
              class="text-base md:text-lg"
              @click="emits('changeModal', 'forgot-password')"
            >
              Forgot Password?
            </button>
          </li>
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
import { Field, Form } from "vee-validate";
import { ref } from "vue";
import { FormInput, CloseIcon } from "@/components";

import { useUserStore } from "@/stores";

import { getCSRF, logInUser } from "@/services";

const emits = defineEmits(["changeModal"]);

const { setUserInfo } = useUserStore();

const loginFields = [
  {
    name: "name",
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

const handleSubmit = async (values) => {
  try {
    await getCSRF();
    const data = await logInUser(values);

    setUserInfo(data.data.user);
    emits("changeModal", "");
  } catch (err) {
    console.log(err);
  }
};
</script>
