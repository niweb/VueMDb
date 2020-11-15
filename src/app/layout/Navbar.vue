<template>
  <Menubar :model="items"></Menubar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menubar from "primevue/menubar";

import paths from "@/shared/paths";

export default defineComponent({
  components: {
    Menubar
  },
  setup() {
    return {
      items: [
        {
          label: "Home",
          to: paths.home
        },
        {
          label: "About",
          to: paths.about
        },
        {
          label: "Most Popular Movies",
          to: paths.movies.mostPopular
        }
      ]
    };
  }
});
</script>
