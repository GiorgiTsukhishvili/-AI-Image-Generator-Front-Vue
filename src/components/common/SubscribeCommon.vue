<template>
  <button
    @click="subscribeOrUnsubscribe"
    class="rounded-full px-6 py-2 text-lg font-semibold"
    :class="[
      subscribedOrNot === 'Subscribe'
        ? 'bg-gray-500 text-white'
        : 'bg-black text-white bg-opacity-80',
    ]"
  >
    {{ subscribedOrNot }}
  </button>
</template>

<script setup>
import { computed } from "vue";

import { getCSRF, addSubscribe } from "@/services";

const props = defineProps({
  subscriber_id: { required: true, type: Number },
  subscribe_to: { required: true, type: Number },
  subscribers: { required: true },
});

const emits = defineEmits(["subscribe"]);

const subscribedOrNot = computed(() =>
  props.subscribers.some(
    (subscriber) => subscriber.subscribed_id === props.subscriber_id
  )
    ? "Unsubscribe"
    : "Subscribe"
);

const subscribeOrUnsubscribe = async () => {
  try {
    await getCSRF();
    const data = await addSubscribe({ subscribed_to: props.subscribe_to });

    if (data.data.message === "Subscribed successfully") {
      emits("subscribe", true);
    } else {
      emits("subscribe", false);
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
