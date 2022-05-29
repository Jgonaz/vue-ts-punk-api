import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/index",
    name: "inicio",
    component: () => import("./components/IndexPage.vue"),
    props: { title: "Inicio" as string },
  },
  {
    path: "/beers",
    name: "beers-list",
    component: () => import("./components/BeersList.vue"),
    props: { title: "Buscador de cervezas" as string },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
