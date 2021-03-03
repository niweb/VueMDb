import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { PathNames } from '@/shared/constants/path-names'
import { WatchableType } from '@/modules/movies/types'

const MovieCollection = () =>
  import(
    /* webpackChunkName: "movie-collection" */ '@/modules/movies/views/Collection.vue'
  )

const EmptyComponent = () =>
  import(
    /* webpackChunkName: "empty-view" */ '@/shared/views/EmptyRouterView.vue'
  )

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: PathNames.HOME,
    redirect: { name: PathNames.MOVIES_POPULAR },
  },
  {
    path: '/movie/:id',
    name: PathNames.MOVIE,
    component: () =>
      import(
        /* webpackChunkName: "movie-detail" */ '@/modules/movies/views/MovieDetail.vue'
      ),
    props(route) {
      const id = Number(route.params.id)
      return {
        id,
        itemType: WatchableType.Movie,
        key: `movie-${id}`,
      }
    },
  },
  {
    path: '/movies',
    name: PathNames.MOVIES,
    component: EmptyComponent,
    children: [
      {
        path: 'popular',
        name: PathNames.MOVIES_POPULAR,
        component: MovieCollection,
        props: {
          title: 'Popular Movies',
          endpoint: 'movie/popular',
          key: 'movie/popular',
          itemType: WatchableType.Movie,
        },
      },
      {
        path: 'now-playing',
        name: PathNames.MOVIES_NOW_PLAYING,
        component: MovieCollection,
        props: {
          title: 'Now Playing Movies',
          endpoint: 'movie/now_playing',
          key: 'movie/now_playing',
          itemType: WatchableType.Movie,
        },
      },
      {
        path: 'top-rated',
        name: PathNames.MOVIES_TOP_RATED,
        component: MovieCollection,
        props: {
          title: 'Top Rated Movies',
          endpoint: 'movie/top_rated',
          key: 'movie/top_rated',
          itemType: WatchableType.Movie,
        },
      },
      {
        path: 'upcoming',
        name: PathNames.MOVIES_UPCOMING,
        component: MovieCollection,
        props: {
          title: 'Upcoming Movies',
          endpoint: 'movie/upcoming',
          key: 'movie/upcoming',
          itemType: WatchableType.Movie,
        },
      },
    ],
  },
  {
    path: '/show/:id',
    name: PathNames.SHOW,
    component: () =>
      import(
        /* webpackChunkName: "movie-detail" */ '@/modules/movies/views/MovieDetail.vue'
      ),
    props(route) {
      const id = Number(route.params.id)
      return {
        id,
        itemType: WatchableType.Show,
        key: `show-${id}`,
      }
    },
  },
  {
    path: '/shows',
    name: PathNames.SHOWS,
    component: EmptyComponent,
    children: [
      {
        path: 'popular',
        name: PathNames.SHOWS_POPULAR,
        component: MovieCollection,
        props: {
          title: 'Popular Shows',
          endpoint: 'tv/popular',
          key: 'tv/popular',
          itemType: WatchableType.Show,
        },
      },
      {
        path: 'top-rated',
        name: PathNames.SHOWS_TOP_RATED,
        component: MovieCollection,
        props: {
          title: 'Top Rated Shows',
          endpoint: 'tv/top_rated',
          key: 'tv/top_rated',
          itemType: WatchableType.Show,
        },
      },
      {
        path: 'airing-soon',
        name: PathNames.SHOWS_AIRING_SOON,
        component: MovieCollection,
        props: {
          title: 'Shows airing soon',
          endpoint: 'tv/on_the_air',
          key: 'tv/on_the_air',
          itemType: WatchableType.Show,
        },
      },
      {
        path: 'airing-today',
        name: PathNames.SHOWS_AIRING_TODAY,
        component: MovieCollection,
        props: {
          title: 'Shows airing today',
          endpoint: 'tv/airing_today',
          key: 'tv/airing_today',
          itemType: WatchableType.Show,
        },
      },
    ],
  },
  {
    // https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
    path: '/:pathMatch(.*)*',
    name: PathNames.NOT_FOUND,
    component: () =>
      import(/* webpackChunkName: "404" */ '@/shared/views/404.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
