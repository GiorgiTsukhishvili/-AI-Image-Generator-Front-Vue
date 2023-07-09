import { createRouter, createWebHistory } from "vue-router";
import { HomeView, SingleBlog } from "@/views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/blog/:id",
      name: "blog",
      component: SingleBlog,
    },
  ],
});

export default router;
