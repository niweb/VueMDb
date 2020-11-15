<template>
  <div id="nav">
    <div v-for="(movie, index) in movies" :key="index" :to="movie.route">
      {{ movie.name }}
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMovieApi } from "@/modules/movies/functions/useMovieApi";

export default defineComponent({
  setup() {
    return {
      movies: useMovieApi()
    };
  }
});
</script>
