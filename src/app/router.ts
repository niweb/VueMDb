import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import paths from "@/shared/paths";

const routes: Array<RouteRecordRaw> = [
  {
    path: paths.home,
    name: "Home",
    component: import(/* webpackChunkName: "home" */ "./views/Home.vue")
  },
  {
    path: paths.about,
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
  },
  {
    path: paths.movies.mostPopular,
    name: "Most Popular Movies",
    component: () =>
      import(
        /* webpackChunkName: "most-popular" */ "@/modules/movies/views/MostPopular.vue"
      )
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
