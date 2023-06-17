<template>
  <div class="bg-green-500 h-screen w-screen relative">
    <div
      class="bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg shadow-2xl max-w-[600px] w-full"
    >
      <h1 class="px-10 pt-16 md:text-4xl text-2xl font-bold">
        Login Into Account
      </h1>
      <Form
        @submit="handleSubmit"
        class="md:px-10 px-5 py-10 flex flex-col gap-6"
      >
        <ul class="w-full">
          <li
            v-for="(inputField, i) in inputFields"
            :key="i"
            class="w-full relative"
          >
            <Field
              :name="inputField.name"
              :type="inputField.type"
              :rules="isRequired"
              class="border border-black rounded-md bg-transparent px-4 py-3 text-lg w-full block text-black mb-10"
              :placeholder="inputField.placeholder"
            />
            <ErrorMessage
              :name="inputField.name"
              class="text-red-600 absolute -bottom-8"
            />
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
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";

const loginFields = [
  { name: "username", type: "text", placeholder: "Input Your Username" },
  { name: "password", type: "password", placeholder: "Input Your Password" },
];

const inputFields = ref(loginFields);

const isRequired = (value) =>
  value && value.trim() ? true : "This field is required";

const handleSubmit = (values) => {
  console.log(values);
};
</script>
