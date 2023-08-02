<template>
  <div v-if="user.user" class="bg-neutral-100 min-h-screen py-40">
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
        </div>
      </div>
    </WrapperComponent>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useUserStore } from "@/stores";

import {
  WrapperComponent,
  UserInfo,
  SecurityIcon,
  UserInformationIcon,
} from "@/components";

const navigation = ref("information");

const user = useUserStore();
</script>
