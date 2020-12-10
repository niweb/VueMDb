<template>
  <h1>Most Popular Movies</h1>
  <ProgressSpinner v-if="loading"></ProgressSpinner>
  <ol v-else>
    <li v-for="(movie, index) in movies" :key="index">
      {{ movie.title }}
    </li>
  </ol>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import ProgressSpinner from 'primevue/progressspinner'

import { MODULES, namespaced } from '@/shared/constants/store-modules'
import { GETTERS } from '@/modules/movies/store/getters'
import { useMovieApi } from '@/modules/movies/functions/useMovieApi'

export default defineComponent({
  components: {
    ProgressSpinner,
  },
  setup() {
    const { loading } = useMovieApi()
    const { getters } = useStore()
    const movies = computed(
      () => getters[namespaced(MODULES.MOVIES, GETTERS.GET_ALL)]
    )
    return {
      page: 0,
      loading,
      movies,
    }
  },
})
</script>
