<template>
  <Form class="flex flex-col items-center w-full" @submit="handleSubmit">
    <div class="w-[300px] h-[300px] rounded-full relative">
      <img
        :src="userInfo.user.image"
        :alt="userInfo.user.name + ' image'"
        class="w-[300px] h-[300px] rounded-full absolute top-0 left-0 opacity-90"
      />
      <Field
        type="file"
        name="image"
        class="opacity-0 z-[2] absolute top-0 left-0 w-[300px] h-[300px] rounded-full"
      />
      <span
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z[1]"
      >
        <CameraIcon />
      </span>
    </div>
    <button>Save changes</button>
  </Form>
</template>

<script setup>
import { Field, Form } from "vee-validate";

import { useUserStore } from "@/stores";

import { CameraIcon } from "@/components";

const userInfo = useUserStore();

const handleSubmit = (data) => {
  console.log(data);
};
</script>
