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
import FormInput from "../components/ui/FormInput.vue";

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
