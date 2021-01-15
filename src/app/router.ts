import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { PATH_NAMES } from '@/shared/constants/path-names'

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
    name: PATH_NAMES.HOME,
    redirect: { name: PATH_NAMES.POPULAR },
  },
  {
    path: '/movie/:id',
    name: PATH_NAMES.MOVIE,
    component: import(
      /* webpackChunkName: "movie-detail" */ '@/modules/movies/views/MovieDetail.vue'
    ),
    props: true,
  },
  {
    path: '/movies',
    name: PATH_NAMES.MOVIES,
    component: EmptyComponent,
    children: [
      {
        path: 'popular',
        name: PATH_NAMES.POPULAR,
        component: MovieCollection,
        props: {
          title: 'Popular Movies',
          endpoint: 'movie/popular',
          key: 'movie/popular',
        },
      },
      {
        path: 'now-playing',
        name: PATH_NAMES.NOW_PLAYING,
        component: MovieCollection,
        props: {
          title: 'Now Playing Movies',
          endpoint: 'movie/now_playing',
          key: 'movie/now_playing',
        },
      },
      {
        path: 'top-rated',
        name: PATH_NAMES.TOP_RATED,
        component: MovieCollection,
        props: {
          title: 'Top Rated Movies',
          endpoint: 'movie/top_rated',
          key: 'movie/top_rated',
        },
      },
      {
        path: 'upcoming',
        name: PATH_NAMES.UPCOMING,
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
