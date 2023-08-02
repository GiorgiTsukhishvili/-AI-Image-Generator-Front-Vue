<template>
  <div v-if="user.user" class="bg-neutral-100 min-h-screen py-40">
    <WrapperComponent>
      <div class="flex gap-10 w-full">
        <ul class="min-w-fit text-2xl font-medium gap-7 flex flex-col">
          <li @click="() => (navigation = 'information')">User Information</li>
          <li @click="() => (navigation = 'security')">Security</li>
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

import { WrapperComponent, UserInfo } from "@/components";

const navigation = ref("information");

const user = useUserStore();
</script>
