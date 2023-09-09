<template>
  <div class="h-20 shadow-2xl w-full bg-neutral-100 relative z-10">
    <WrapperComponent>
      <div class="flex items-center h-20 justify-between w-full">
        <a href="/" class="font-bold md:text-2xl text-xl uppercase"
          >Image Echoes</a
        >
        <div>
          <div class="flex items-center gap-4" v-if="user.user === null">
            <button
              class="bg-none text-blue-600 border border-blue-600 rounded-md text-lg font-bold px-4 py-1"
              @click="() => changeModal('login')"
            >
              Login
            </button>
            <button
              @click="() => changeModal('register')"
              class="text-white bg-blue-600 border border-blue-600 rounded-md text-lg font-bold px-4 py-1"
            >
              Sign Up
            </button>
          </div>
          <NavbarUser v-else :userInfo="user" />
        </div>
      </div>
    </WrapperComponent>
  </div>
  <LoginForm
    v-if="whichModalOpen === 'login'"
    @changeModal="(modalState) => changeModal(modalState)"
  />
  <RegisterForm
    v-if="whichModalOpen === 'register'"
    @changeModal="(modalState) => changeModal(modalState)"
  />
  <ForgotPasswordForm
    v-if="whichModalOpen === 'forgot-password'"
    @changeModal="(modalState) => changeModal(modalState)"
  />
  <RegistrationSentModal
    v-if="whichModalOpen === 'registration-sent'"
    @changeModal="(modalState) => changeModal(modalState)"
  />
  <SuccessModal
    v-if="whichModalOpen === 'success'"
    @changeModal="(modalState) => changeModal(modalState)"
    :text="successModalText"
  />
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

import {
  LoginForm,
  WrapperComponent,
  RegisterForm,
  ForgotPasswordForm,
  NavbarUser,
  RegistrationSentModal,
  SuccessModal,
} from "@/components";

import { useUserStore } from "@/stores";
import { axios } from "@/services";

const whichModalOpen = ref("");

const successModalText = ref("");

const user = useUserStore();

const changeModal = (modal) => (whichModalOpen.value = modal);

watchEffect(() => {
  if (whichModalOpen.value !== "") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }
});

onMounted(async () => {
  await router.isReady();
  const { query } = route;
  if (query.type) {
    if (query.type === "register") {
      const link = `${query["register-link"]}&token=${query.token}&signature=${query.signature}`;
      try {
        await axios.get(link);
        whichModalOpen.value = "success";
        successModalText.value = "Email verified successfully";
      } catch (_) {
        router.push("/");
      }
    }

    console.log();
  }
});
</script>
