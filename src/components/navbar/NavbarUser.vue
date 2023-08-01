<template>
  <div>
    <button @click="logout">logout</button>
  </div>
</template>

<script setup>
import { logoutUser, getCSRF } from "@/services";

const props = defineProps({ userInfo: { required: true } });

const logout = async () => {
  try {
    await getCSRF();
    await logoutUser();
    props.userInfo.setUserInfo(null);
  } catch (err) {
    console.log(err);
  }
};
</script>
