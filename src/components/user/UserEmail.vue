<template>
  <h1 class="md:px-10 px-5 pt-16 md:text-4xl text-2xl font-bold">
    Update Email
  </h1>
  <Form
    @submit="handleSubmit"
    class="md:px-10 px-5 py-10 flex flex-col gap-6 max-w-[600px] w-full"
    v-if="inputOpen"
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
    <button @click="() => (inputOpen = true)" class="text-lg">
      Update Email
    </button>
  </ul>
  <EmailSentModal
    v-if="modalOpen"
    @changeModal="() => (modalOpen = false)"
    :text="text"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Form } from "vee-validate";

import { useRoute, useRouter } from "vue-router";

import { useUserStore } from "@/stores";
import { updateEmail, axios } from "@/services";

import { FormInput, EmailSentModal } from "@/components";

const router = useRouter();
const route = useRoute();

const user = useUserStore();

const inputOpen = ref(false);
const modalOpen = ref(false);
const text = ref("Email Update mail was sent.");

const handleSubmit = async (values) => {
  try {
    await updateEmail(values);

    text.value = "Email Update mail was sent.";
    modalOpen.value = true;
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  await router.isReady();
  const { query } = route;
  if (query.type) {
    if (query.type === "email") {
      const link = `${query["email-link"]}&token=${query.token}&signature=${query.signature}&email=${query.email}`;

      try {
        const data = await axios.get(link);

        user.setUserInfo({ ...user.user, email: data.data.email });

        modalOpen.value = true;

        text.value = "Email verified successfully";
      } catch (_) {
        router.push("/settings");
      }
    }
  }
});
</script>
