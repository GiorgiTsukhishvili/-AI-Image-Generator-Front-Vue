<template>
  <div
    v-if="user.user"
    class="bg-neutral-100 min-h-screen"
    :class="navigation === 'information' ? 'py-40' : 'pb-40'"
  >
    <WrapperComponent>
      <div class="flex gap-10 w-full lg:flex-row flex-col">
        <ul
          class="min-w-fit text-2xl uppercase font-medium gap-7 flex flex-col mt-20"
        >
          <li
            class="flex items-center"
            @click="() => (navigation = 'information')"
          >
            <UserInformationIcon /> User Information
          </li>
          <li
            class="flex items-center"
            @click="() => (navigation = 'security')"
          >
            <SecurityIcon /> Security
          </li>
        </ul>
        <div class="flex flex-col items-center w-full">
          <UserInfo v-if="navigation === 'information'" />
          <UserSecurity v-if="navigation === 'security'" />
        </div>
      </div>
    </WrapperComponent>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useUserStore } from "@/stores";

import { useRoute, useRouter } from "vue-router";

import {
  WrapperComponent,
  UserInfo,
  SecurityIcon,
  UserInformationIcon,
  UserSecurity,
} from "@/components";

const navigation = ref("information");

const user = useUserStore();

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  await router.isReady();
  const { query } = route;
  if (query.type) {
    if (query.type === "email") {
      navigation.value = "security";
    }
  }
});
</script>
