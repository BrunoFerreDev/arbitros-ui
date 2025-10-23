import { createWebHistory, createRouter } from "vue-router";
const history = createWebHistory();

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./components/DashBoard.vue"),
  },
  {
    path: "/partido",
    name: "partido",
    component: () => import("./components/PartidoDetalle.vue"),
  },
  {
    path: "/partido/:partidoId",
    name: "partido",
    component: () => import("./components/PartidoDetalle.vue"),
  },
];

export default createRouter({
  history,
  routes,
});
