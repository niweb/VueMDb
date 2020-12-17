<template>
  <h1>Most Popular Movies</h1>
  <LoadingOverlay :active="loading">
    <MovieDataView :movies="movies"></MovieDataView>
  </LoadingOverlay>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import { MODULES, namespaced } from '@/shared/constants/store-modules'
import { GETTERS } from '@/modules/movies/store/getters'
import { useMovieApi } from '@/modules/movies/functions/useMovieApi'

import MovieDataView from '@/modules/movies/components/MovieDataView.vue'
import LoadingOverlay from '@/shared/components/LoadingOverlay.vue'

export default defineComponent({
  components: {
    LoadingOverlay,
    MovieDataView,
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
