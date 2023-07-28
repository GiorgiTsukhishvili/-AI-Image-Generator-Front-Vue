<template>
  <div class="flex-1">
    <div class="flex gap-5 items-center">
      <LikeIcon />
      <h3 class="md:text-2xl text-xl font-medium">
        {{ blogInfo.likes.length }} Likes
      </h3>
    </div>
    <button
      class="text-xl font-bold mt-4"
      @click="like"
      v-if="user.user !== null"
    >
      {{ likeOrUnlike }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores";

import { getCSRF, likeBlog } from "@/services";

import { LikeIcon } from "@/components";

const user = useUserStore();

const props = defineProps({ blogInfo: { required: true } });

const likeOrUnlike = computed(() =>
  props.blogInfo.likes.some((like) => like.user_id === user.user.id)
    ? "Unlike Blog"
    : "Like Blog"
);

const emits = defineEmits(["removeOrAdd"]);

const like = async () => {
  try {
    await getCSRF();
    const data = await likeBlog({
      user_id: user.user.id,
      blog_id: props.blogInfo.id,
    });
    if (data.data.message === "Blog liked successfully") {
      emits("removeOrAdd", true);
    } else {
      emits("removeOrAdd", false);
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
