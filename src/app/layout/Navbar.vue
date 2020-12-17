<template>
  <Menubar :model="items"></Menubar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Menubar from 'primevue/menubar'

import paths from '@/shared/constants/router-paths'

export default defineComponent({
  components: {
    Menubar,
  },
  setup() {
    return {
      items: [
        {
          label: 'Most Popular Movies',
          to: paths.movies.mostPopular,
        },
      ],
    }
  },
})
</script>
