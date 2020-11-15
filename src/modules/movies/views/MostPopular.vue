<template>
  <h1>Most Popular Movies</h1>
  <ol>
    <li v-for="(movie, index) in movies" :key="index">
      {{ movie.title }}
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useMovieApi } from "@/modules/movies/functions/useMovieApi";

export default defineComponent({
  setup() {
    const { movies } = useMovieApi();
    watch(movies, () => {
      console.log("movies", movies.value);
    });
    return {
      movies
    };
  }
});
</script>
