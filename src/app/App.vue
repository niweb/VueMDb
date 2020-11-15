<template>
  <div id="nav">
    <router-link v-for="(item, index) in items" :key="index" :to="item.route">{{
      item.name
    }}</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import paths from "@/shared/paths";

export default defineComponent({
  setup() {
    return {
      items: [
        {
          name: "Home",
          route: paths.home
        },
        {
          name: "About",
          route: paths.about
        },
        {
          name: "Most Popular Movies",
          route: paths.movies.mostPopular
        }
      ]
    };
  }
});
</script>
