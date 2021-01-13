<template>
  <h1>Most Popular Movies</h1>
  <LoadingOverlay :active="loading">
    <div v-if="error">
      {{ error }}
    </div>
    <MovieDataView :movies="data?.results" :page="data?.page"></MovieDataView>
  </LoadingOverlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMovieApi } from '@/modules/movies/functions/useMovieApi'

import MovieDataView from '@/modules/movies/components/MovieDataView.vue'
import LoadingOverlay from '@/shared/components/LoadingOverlay.vue'

export default defineComponent({
  components: {
    LoadingOverlay,
    MovieDataView,
  },
  setup() {
    const { data, error, loading } = useMovieApi('movie/popular')

    return {
      loading,
      error,
      data,
    }
  },
})
</script>
