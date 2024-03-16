import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SearchByName from "@/views/SearchByName.vue";
import FilterByCategory from "@/views/FilterByCategory.vue";
import HowToCook from "@/views/HowToCook.vue";
import CategoryName from "@/views/CategoryName.vue";
import NotFound from "@/views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/search",
    name: "search",
    component: SearchByName,
  },
  {
    path: "/categories",
    name: "category",
    component: CategoryName,
  },
  {
    name: "how to cook",
    path: `/how-to-cook/:name`,
    component: HowToCook,
    query: { id: "" },
  },
  {
    path: `/category/:name`,
    name: "categoryName",
    component: FilterByCategory,
    query: {
      id: "",
    },
  },
  {
    name: "not found",
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "meal-recipe",
  routes,
});

export default router;
