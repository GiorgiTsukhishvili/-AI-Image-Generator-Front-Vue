<template>
  <div class="bg-neutral-100 min-h-screen pb-40 pt-60">
    <WrapperComponent
      ><div class="flex flex-col">
        <div>
          <h2
            class="mt-16 pb-10 mb-10 border-b-2 border-gray-500 w-full md:text-3xl text-2xl"
          >
            Collections:
          </h2>
          <h1
            v-if="collections.length === 0"
            class="md:text-3xl text-2xl font-semibold"
          >
            User Has No Collections So Far
          </h1>
        </div>
        <ul
          v-if="collections.length !== 0"
          class="flex flex-wrap gap-10 justify-center"
        >
          <li v-for="collection in collections" :key="collection.id">
            <div class="flex justify-center gap-5">
              <span
                @click="() => deleteChoseCollection(collection.id)"
                class="cursor-pointer"
              >
                <DeleteIcon />
              </span>
              <span>
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
</template>

<script setup>
import { WrapperComponent, DeleteIcon, EditIcon } from "@/components";

import { useUserStore } from "@/stores";

const user = useUserStore();
const collections = ref([]);

import { getUserCollections, deleteCollection } from "@/services";
import { ref, watchEffect } from "vue";

const userCollections = async () => {
  const data = await getUserCollections();

  collections.value = data.data;
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

watchEffect(() => {
  if (user.user) {
    userCollections();
  }
});
</script>
