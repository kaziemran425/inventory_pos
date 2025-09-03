const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/login", component: () => import("pages/loginePage.vue") },
      { path: "/signUp", component: () => import("pages/singUp.vue") },
      { path: "/order", component: () => import("pages/ordersPanel.vue") },
      { path: "/instock", component: () => import("pages/inStock.vue") },
      { path: "/instock2", component: () => import("pages/inStock2.vue") },
      { path: "/dashboard", component: () => import("pages/dasBoard.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes
