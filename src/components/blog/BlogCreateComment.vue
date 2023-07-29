<template>
  <Form
    class="flex-1 flex flex-col gap-5 relative"
    v-if="user.user !== null"
    @submit="handleSubmit"
  >
    <label class="text-xl font-bold">Add Comment</label>
    <Field
      as="textArea"
      name="comment"
      id="comment"
      cols="30"
      rows="5"
      :validate-on-input="true"
      rules="required"
      v-model="comment"
      class="bg-none text-lg py-4 px-4 max-w-[600px] text-black border-2 border-gray-600 focus:ring-0 focus:outline-none rounded-md"
    />
    <button
      v-if="comment.trim() !== ''"
      class="text-lg font-semibold self-start absolute -bottom-10"
    >
      Comment
    </button>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { Field, Form } from "vee-validate";

import { useUserStore } from "@/stores";

import { getCSRF, addComment } from "@/services";

const comment = ref("");

const user = useUserStore();

const props = defineProps({ blogId: { required: true, type: Number } });

const emits = defineEmits(["addNewComment"]);

const handleSubmit = async (value) => {
  try {
    await getCSRF();

    const data = await addComment({
      user_id: user.user.id,
      blog_id: props.blogId,
      comment: value.comment,
    });

    emits("addNewComment", data.data);
  } catch (err) {
    console.log(err);
  }
};
</script>
