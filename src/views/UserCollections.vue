<template>
  <div class="bg-neutral-100 min-h-screen pb-40 pt-60">
    <WrapperComponent
      ><div class="flex flex-col w-full">
        <div
          class="mb-10 mt-16 pb-10 border-b-2 border-gray-500 w-full flex justify-between items-center md:flex-row flex-col-reverse"
        >
          <h2 class="md:text-3xl text-2xl">Collections:</h2>
          <button
            class="md:text-2xl text-xl bg-green-500 text-white py-2 px-4 rounded-md"
            @click="() => (modalOpen = true)"
          >
            Create Collection
          </button>
        </div>
        <h1
          v-if="collections.length === 0"
          class="md:text-3xl text-2xl font-semibold"
        >
          User Has No Collections So Far
        </h1>
        <ul
          v-if="collections.length !== 0"
          class="flex flex-wrap gap-10 justify-start"
        >
          <li v-for="collection in collections" :key="collection.id">
            <div class="flex justify-center gap-5 mb-5">
              <span
                @click="() => deleteChoseCollection(collection.id)"
                class="cursor-pointer"
              >
                <DeleteIcon />
              </span>
              <span @click="() => editCollection(collection)">
                <EditIcon collection />
              </span>
            </div>
            <RouterLink
              :to="{
                name: 'collection',
                params: { user: user.user.name },
                query: { collection: collection.id },
              }"
            >
              <img
                :src="
                  collection.image
                    ? collection.image
                    : '/assets/imgs/folder-icon.png'
                "
                alt="collection image"
                class="w-48 h-48 object-cover"
              />
              <h2
                class="text-center md:text-xl text-lg font-medium max-w-[180px] my-5"
              >
                {{ collection.name }}
              </h2>
              <h3
                class="text-center md:text-xl text-lg font-medium max-w-[180px]"
              >
                Total blogs: {{ collection.blogs_count }}
              </h3>
            </RouterLink>
          </li>
        </ul>
      </div></WrapperComponent
    >
  </div>
  <CollectionModal
    v-if="modalOpen"
    @changeModal="closeModal"
    @updateCollections="(collection) => updateCollections(collection)"
    :collectionValues="collectionValues"
    :updatable="updatable"
  />
</template>

<script setup>
import {
  WrapperComponent,
  DeleteIcon,
  EditIcon,
  CollectionModal,
} from "@/components";

import { useUserStore } from "@/stores";

import { getUserCollections, deleteCollection } from "@/services";
import { ref, watchEffect } from "vue";

const user = useUserStore();

const collections = ref([]);
const modalOpen = ref(false);
const updatable = ref({ open: false, id: null });
const collectionValues = ref({ image: null, name: "" });

const userCollections = async () => {
  const data = await getUserCollections();

  collections.value = data.data;
};

const editCollection = (collection) => {
  modalOpen.value = true;
  updatable.value = { open: true, id: collection.id };
  collectionValues.value = { image: collection.image, name: collection.name };
};

const updateCollections = (data) => {
  if (collections.value.every((el) => el.id !== data.id)) {
    collections.value.unshift({ ...data, blogs_count: 0 });
  } else {
    collections.value = collections.value.map((el) =>
      el.id === data.id ? { ...el, ...data } : el
    );
  }
};

const deleteChoseCollection = async (id) => {
  try {
    await deleteCollection(id);
    collections.value = collections.value.filter(
      (collection) => collection.id !== id
    );
  } catch (err) {
    console.log(err);
  }
};

const closeModal = () => {
  modalOpen.value = false;
  updatable.value = { open: false, id: null };
  collectionValues.value = { image: null, name: "" };
};

watchEffect(() => {
  if (user.user) {
    userCollections();
  }
});
</script>
