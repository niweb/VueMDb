<template>
  <Menubar :model="items">
    <template #start>
      <!--      <img src="https://www.codeapi.io/initials/V?gradient=43aa8b,577590,45&shape=circle&weight=900" />-->
      <h1 class="p-mx-4">🦥 WuMBD</h1>
    </template>
  </Menubar>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Menubar from 'primevue/menubar'

import NAMES from '@/shared/constants/router-names'

export default defineComponent({
  components: {
    Menubar,
  },
  setup() {
    return {
      items: reactive([
        {
          label: 'Movies',
          items: [
            {
              label: 'Now Playing',
              to: { name: NAMES.NOW_PLAYING },
            },
            {
              label: 'Popular',
              to: { name: NAMES.POPULAR },
            },
            {
              label: 'Top Rated',
              to: { name: NAMES.TOP_RATED },
            },
            {
              label: 'Upcoming',
              to: { name: NAMES.UPCOMING },
            },
          ],
        },
      ]),
    }
  },
})
</script>
