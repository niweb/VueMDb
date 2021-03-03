<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Menubar from 'primevue/menubar'

import { PathNames } from '@/shared/constants/path-names'
import SearchBar from '@/shared/components/SearchBar.vue'

export default defineComponent({
  components: {
    SearchBar,
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
              to: { name: PathNames.MOVIES_NOW_PLAYING },
            },
            {
              label: 'Popular',
              to: { name: PathNames.MOVIES_POPULAR },
            },
            {
              label: 'Top Rated',
              to: { name: PathNames.MOVIES_TOP_RATED },
            },
            {
              label: 'Upcoming',
              to: { name: PathNames.MOVIES_UPCOMING },
            },
          ],
        },
        {
          label: 'Shows',
          items: [
            {
              label: 'Popular',
              to: { name: PathNames.SHOWS_POPULAR },
            },
            {
              label: 'Top Rated',
              to: { name: PathNames.SHOWS_TOP_RATED },
            },
            {
              label: 'Airing soon',
              to: { name: PathNames.SHOWS_AIRING_SOON },
            },
            {
              label: 'Airing today',
              to: { name: PathNames.SHOWS_AIRING_TODAY },
            },
          ],
        },
      ]),
    }
  },
})
</script>

<template>
  <Menubar :model="items">
    <template #start>
      <!--      <img src="https://www.codeapi.io/initials/V?gradient=43aa8b,577590,45&shape=circle&weight=900" />-->
      <h1 class="p-mx-4">🦥 WuMBD</h1>
    </template>
    <template #end>
      <SearchBar />
    </template>
  </Menubar>
</template>
