import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/layouts/DashboardLayout.vue"),
      children: [
        {
          path: "/",
          name: "Dashboard",
          component: () => import("@/views/pages/DashboardPage.vue"),
        },
        {
          path: "/economic-aspects-agriculture",
          name: "EconomicAspectsOfAgriculture",
          component: () =>
            import("@/views/pages/EconomicAspectsOfAgriculturePage.vue"),
        },
        {
          path: "/crop-production",
          name: "CropProduction",
          component: () => import("@/views/pages/CropProdutionsPage.vue"),
        },
        {
          path: "/livestock",
          name: "Livestock",
          component: () => import("@/views/pages/LivestockPage.vue"),
        },
        {
          path: "/seed-and-fertilizers",
          name: "SeedAndFertilizers",
          component: () => import("@/views/pages/SeedAndFertilizerPage.vue"),
        },
        {
          path: "/crop-price",
          name: "CropPrice",
          component: () => import("@/views/pages/CropPricePage.vue"),
        },
      ],
    },
  ],
});

export default router;
