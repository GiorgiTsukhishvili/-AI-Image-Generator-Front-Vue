<template>
  <div class="h-20 w-full bg-neutral-100 md:hidden" v-if="homePage" />
  <div
    class="h-20 shadow-2xl w-full bg-neutral-100 z-10"
    :class="homePage ? 'fixed md:relative top-0 left-0' : 'relative'"
  >
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
    @changeModal="(modalState, text) => changeModal(modalState, text)"
  />
  <PasswordResetForm
    v-if="whichModalOpen === 'password-reset'"
    @sentModalUpdate="(modalState, text) => sentModalUpdate(modalState, text)"
  />
  <ForgotPasswordForm
    v-if="whichModalOpen === 'forgot-password'"
    @changeModal="(modalState, text) => changeModal(modalState, text)"
  />
  <EmailSentModal
    v-if="whichModalOpen === 'modal-sent'"
    @changeModal="(modalState) => changeModal(modalState)"
    :text="emailSentText"
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

import {
  LoginForm,
  WrapperComponent,
  RegisterForm,
  ForgotPasswordForm,
  NavbarUser,
  EmailSentModal,
  SuccessModal,
  PasswordResetForm,
} from "@/components";

import { useUserStore } from "@/stores";
import { axios } from "@/services";

const whichModalOpen = ref("");

const successModalText = ref("");

const emailSentText = ref("");

const homePage = ref(false);

const user = useUserStore();

const router = useRouter();
const route = useRoute();

watchEffect(() => {
  if (route.name === "home") {
    homePage.value = true;
  }
});

const changeModal = (modal, text = "") => {
  whichModalOpen.value = modal;
  emailSentText.value = text;
};

const sentModalUpdate = (modal, text = "") => {
  whichModalOpen.value = modal;
  successModalText.value = text;
};

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

    if (query.type === "reset") {
      whichModalOpen.value = "password-reset";
    }
  }
});
</script>
