import { createRouter, createWebHistory } from "vue-router";
import { HomeView, SingleBlog, NotFound, SingleUserView } from "@/views";

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
    {
      path: "/user/:name",
      name: "user",
      component: SingleUserView,
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ],
});

export default router;
