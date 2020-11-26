<template>
  <h1>Most Popular Movies</h1>
  <movie-table></movie-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMovieApi } from '@/modules/movies/functions/useMovieApi'
import MovieTable from '@/modules/movies/components/MovieTable.vue'

export default defineComponent({
  components: { MovieTable },
  setup() {
    const { movies } = useMovieApi()
    return {
      movies,
    }
  },
})
</script>
