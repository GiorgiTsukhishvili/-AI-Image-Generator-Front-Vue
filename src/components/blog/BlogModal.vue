<template>
  <div
    class="fixed top-0 left-0 w-screen min-h-screen flex justify-center scrollbar-hide items-center overflow-scroll z-50"
  >
    <div
      class="bg-black bg-opacity-20 fixed top-0 left-0 w-screen min-h-screen"
      @click="emits('changeModal', false)"
    />
    <div
      class="bg-white scrollbar-hide rounded-lg shadow-2xl md:max-w-[700px] md:w-full pb-10 h-screen w-screen md:max-h-[900px] overflow-scroll relative md:h-auto z-10"
    >
      <div
        class="absolute top-10 right-10 md:hidden"
        @click="emits('changeModal', false)"
      >
        <CloseIcon />
      </div>
      <Form
        @submit="handleSubmit"
        class="md:px-10 px-5 py-10 flex flex-col gap-6"
      >
        <div class="relative w-full">
          <div class="relative mb-7">
            <label for="title" class="text-2xl">Title:</label>
            <Field
              type="text"
              name="title"
              id="title"
              rules="required"
              :validate-on-input="true"
              class="border border-black focus:border-blue-600 hover:border-blue-600 duration-300 rounded-md bg-transparent focus:border focus:outline-none px-4 py-3 text-lg w-full block text-black mb-3"
              v-model="title"
              placeholder="Input Your New Collection Title"
            />
            <ErrorMessage
              name="title"
              class="text-red-600 absolute -bottom-7"
            />
          </div>
          <div class="relative mb-7">
            <label for="collection" class="text-2xl">Collection:</label>
            <Field
              name="collection"
              as="select"
              class="border border-black focus:border-blue-600 hover:border-blue-600 duration-300 rounded-md bg-transparent focus:border focus:outline-none px-4 py-4 text-lg w-full block text-black mb-3"
              rules="requiredSelect"
              v-model="chosenCollection"
            >
              <option value="" disabled selected>Select a collection</option>
              <option
                value=""
                disabled
                v-if="props.tagsAndCollections.collections.length === 0"
              >
                You have no collections, Please create one.
              </option>
              <option
                v-else
                v-for="collection in props.tagsAndCollections.collections"
                :key="collection.id"
                :value="collection.id"
                :selected="collection.id === chosenCollection"
              >
                {{ collection.name }}
              </option>
            </Field>
            <ErrorMessage
              name="collection"
              class="text-red-600 absolute -bottom-7"
            />
          </div>
          <div class="relative mb-7">
            <label for="tag" class="text-2xl">Tags:</label>
            <Field
              name="tag"
              as="select"
              class="border border-black focus:border-blue-600 hover:border-blue-600 duration-300 rounded-md bg-transparent focus:border focus:outline-none px-4 py-4 text-lg w-full block text-black mb-3"
              rules="requiredSelect"
              multiple
              v-model="tags"
            >
              <option
                v-for="tag in props.tagsAndCollections.tags"
                :key="tag.id"
                :value="tag.id"
                :selected="tags.includes(tag.id)"
              >
                {{ tag.name }}
              </option>
            </Field>
            <ErrorMessage name="tag" class="text-red-600 absolute -bottom-7" />
          </div>
          <div class="relative mb-7">
            <label for="description" class="text-2xl">Add Description:</label>
            <Field
              as="textArea"
              name="description"
              id="description"
              cols="30"
              rows="5"
              :validate-on-input="true"
              rules="required"
              class="border border-black focus:border-blue-600 hover:border-blue-600 duration-300 rounded-md bg-transparent focus:border focus:outline-none px-4 py-4 text-lg w-full block text-black mb-3"
              placeholder="Add your description of image"
              v-model="description"
            />
            <ErrorMessage
              name="description"
              class="text-red-600 absolute -bottom-7"
            />
          </div>
        </div>

        <div class="w-full h-[300px] relative mb-5">
          <img
            v-if="image"
            :src="typeof image === 'string' ? image : createUrl(image)"
            alt="collection image"
            class="w-full h-[300px] absolute top-0 left-0 object-cover"
          />
          <Field
            rules="requiredSelect"
            type="file"
            name="image"
            id="image"
            class="opacity-0 z-[2] absolute top-0 left-0 w-full h-[300px] rounded-full"
            @input="(e) => handleFileUpload(e.target.files, 'image')"
          />
          <span
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] flex flex-col items-center"
          >
            <h2 class="text-3xl" v-if="image === null">Upload Image</h2>
            <CameraIcon />
          </span>
          <ErrorMessage name="image" class="text-red-600 absolute -bottom-7" />
        </div>
        <button
          type="submit"
          class="bg-green-500 text-white py-2 px-4 md:inline block w-full md:max-w-[160px] rounded-md uppercase hover:bg-green-600 duration-300 text-lg"
        >
          Submit
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";

import { createBlog } from "@/services";

import { CloseIcon, CameraIcon } from "@/components";

const emits = defineEmits(["changeModal", "updateBlogs"]);
const props = defineProps({
  tagsAndCollections: { required: true },
  updatable: { required: true },
});

const image = ref(null);
const title = ref("");
const chosenCollection = ref(null);
const tags = ref([]);
const description = ref("");

const handleFileUpload = (data) => {
  if (data !== null) {
    if (data[0]) {
      image.value = data[0];
    }
  }
};

const createUrl = (url) => URL.createObjectURL(url);

const handleSubmit = async () => {
  const data = new FormData();
  data.append("image", image.value);
  data.append("title", title.value);
  data.append("description", description.value);
  data.append("blog_collection_id", chosenCollection.value);
  data.append("tags", JSON.stringify(tags.value));

  try {
    let returnedData;
    if (props.updatable.open) {
      //
    } else {
      returnedData = await createBlog(data);
    }

    emits("updateBlogs", returnedData.data.data, tags.value);
    emits("changeModal", false);
  } catch (err) {
    console.log(err);
  }

  await createBlog(data);
};
</script>
