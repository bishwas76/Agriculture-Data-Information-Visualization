import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/layouts/DashboardLayout.vue"),
      children: [
        {
          path: "/",
          name: "Dashboard",
          component: () => import("../views/pages/DashboardPage.vue"),
        },
      ],
    },
  ],
});

export default router;
