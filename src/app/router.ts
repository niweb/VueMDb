import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import paths from '@/shared/constants/router-paths'

const routes: Array<RouteRecordRaw> = [
  {
    path: paths.home,
    redirect: paths.movies.mostPopular,
  },
  {
    path: paths.movies.mostPopular,
    name: 'Most Popular Movies',
    component: () =>
      import(
        /* webpackChunkName: "most-popular" */ '@/modules/movies/views/MostPopular.vue'
      ),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
