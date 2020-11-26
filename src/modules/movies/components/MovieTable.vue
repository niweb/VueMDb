<template>
  <DataTable
    :value="movies"
    :scrollable="true"
    scrollHeight="400px"
    :lazy="true"
    :rows="2"
    :loading="loading"
    :virtualScroll="true"
    :virtualRowHeight="45"
    @virtual-scroll="onVirtualScroll"
    :totalRecords="movies.length"
  >
    <Column
      v-for="col of columns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
    ></Column>
  </DataTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Movie } from '@/modules/movies/types'

export default defineComponent({
  props: {
    movies: {
      type: Array as () => Movie[],
      default: [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      columns: [{ field: 'title', header: 'Title' }],
      onVirtualScroll(event: { first: number; page: number }) {
        console.error('onVirtualScroll', event)
      },
    }
  },
})
</script>
