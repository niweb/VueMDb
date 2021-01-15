import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NAMES from '@/shared/constants/router-names'

const MovieCollection = () =>
  import(
    /* webpackChunkName: "movie-collection" */ '@/modules/movies/views/MovieCollection.vue'
  )

const EmptyComponent = () =>
  import(
    /* webpackChunkName: "empty-view" */ '@/shared/views/EmptyRouterView.vue'
  )

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: NAMES.HOME,
    redirect: { name: NAMES.POPULAR },
  },
  {
    path: '/movies',
    name: NAMES.MOVIES,
    component: EmptyComponent,
    children: [
      {
        path: 'popular',
        name: NAMES.POPULAR,
        component: MovieCollection,
        props: {
          title: 'Popular Movies',
          endpoint: 'movie/popular',
          key: 'movie/popular',
        },
      },
      {
        path: 'now-playing',
        name: NAMES.NOW_PLAYING,
        component: MovieCollection,
        props: {
          title: 'Now Playing Movies',
          endpoint: 'movie/now_playing',
          key: 'movie/now_playing',
        },
      },
      {
        path: 'top-rated',
        name: NAMES.TOP_RATED,
        component: MovieCollection,
        props: {
          title: 'Top Rated Movies',
          endpoint: 'movie/top_rated',
          key: 'movie/top_rated',
        },
      },
      {
        path: 'upcoming',
        name: NAMES.UPCOMING,
        component: MovieCollection,
        props: {
          title: 'Upcoming Movies',
          endpoint: 'movie/upcoming',
          key: 'movie/upcoming',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
