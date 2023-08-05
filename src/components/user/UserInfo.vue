<template>
  <Form class="flex flex-col items-center w-full" @submit="handleSubmit">
    <img
      v-if="userImages.background_image"
      :src="
        typeof userImages.background_image === 'string'
          ? userImages.background_image
          : createUrl(userImages.background_image)
      "
      :alt="userImages.name + ' background image'"
      class="absolute w-screen top-0 left-0 h-[300px] object-cover"
    />
    <div class="absolute z-[1] top-28 right-10 w-[50px] h-[50px]">
      <Field
        type="file"
        name="background_image"
        class="opacity-0 z-[2] absolute top-0 left-0 w-[50px] h-[50px]"
        @input="(e) => handleFileUpload(e.target.files, 'background_image')"
      />
      <EditIcon />
    </div>
    <div class="w-[300px] h-[300px] rounded-full relative">
      <img
        :src="
          typeof userImages.image === 'string'
            ? userImages.image
            : createUrl(userImages.image)
        "
        :alt="userImages.name + ' image'"
        class="w-[300px] h-[300px] rounded-full absolute top-0 left-0"
      />
      <Field
        type="file"
        name="image"
        class="opacity-0 z-[2] absolute top-0 left-0 w-[300px] h-[300px] rounded-full"
        @input="(e) => handleFileUpload(e.target.files, 'image')"
      />
      <span
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z[1]"
      >
        <CameraIcon />
      </span>
    </div>
    <div class="max-w-[600px] w-full">
      <label class="text-base md:text-lg block mb-2" for="name">Username</label>
      <Field
        name="name"
        type="text"
        rules="required|min:3"
        :validate-on-input="true"
        class="border border-black focus:border-blue-600 hover:border-blue-600 duration-300 rounded-md bg-transparent focus:border focus:outline-none px-4 py-3 text-lg w-full block text-black mb-3"
        placeholder="Enter new username"
        :value="userInfo.user.name"
      />
      <span class="h-4 inline-block">
        <ErrorMessage name="name" class="text-red-600 h-4" />
      </span>

      <label class="text-base md:text-lg block mb-2" for="description"
        >Description</label
      >
      <Field
        as="textarea"
        name="description"
        rules="required|min:3"
        :validate-on-input="true"
        cols="30"
        rows="5"
        class="border border-black focus:border-blue-600 hover:border-blue-600 duration-300 rounded-md bg-transparent focus:border focus:outline-none px-4 py-3 text-lg w-full block text-black mb-3"
        :value="userInfo.user.description"
      />

      <span class="h-4 inline-block">
        <ErrorMessage name="description" class="text-red-600 h-4" />
      </span>
    </div>
    <button class="text-2xl font-medium">Save changes</button>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";

import { useUserStore } from "@/stores";

import { CameraIcon, EditIcon } from "@/components";

const userInfo = useUserStore();

const userImages = ref({
  background_image: userInfo.user.background_image ?? "",
  image: userInfo.user.image ?? "",
});

const handleFileUpload = (data, field) => {
  if (data !== null) {
    if (data[0]) {
      userImages.value = { ...userImages.value, [field]: data[0] };
    }
  }
};

const createUrl = (url) => URL.createObjectURL(url);

const handleSubmit = (data) => {
  console.log(data);
};
</script>
