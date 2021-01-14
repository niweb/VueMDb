<template>
  <div v-if="error">
    {{ error }}
  </div>
  <!-- TODO: reactive "value" does not rerender component! -->
  <DataView
    :layout="layout"
    :value="movies"
    :rows="movies?.length"
    :lazy="true"
    :loading="loading"
    :totalRecords="total"
    :paginator="true"
    paginatorPosition="both"
    @page="page = $event.page + 1"
  >
    <template #header>
      <div class="p-grid p-nogutter">
        <div class="p-col-6 p-text-left">
          <h2>{{ title }}</h2>
        </div>
        <div class="p-col-6 p-text-right">
          <DataViewLayoutOptions v-model="layout" />
        </div>
      </div>
    </template>
    <template #list="{data}">
      <MovieList :movie="data"></MovieList>
    </template>
    <template #grid="{ data }">
      <MovieGrid :movie="data"></MovieGrid>
    </template>
  </DataView>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'

import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'

import { useMovieApi } from '@/modules/movies/functions/useMovieApi'
import MovieList from '@/modules/movies/components/MovieList.vue'
import MovieGrid from '@/modules/movies/components/MovieGrid.vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
      default: 'Popular movies',
    },

    endpoint: {
      type: String,
      required: false,
      default: 'movie/popular',
    },
  },

  components: {
    DataView,
    DataViewLayoutOptions,
    MovieList,
    MovieGrid,
  },

  setup(props) {
    const page = ref(1)

    const { data, error, loading } = useMovieApi(
      props.endpoint,
      reactive({
        page,
      })
    )

    return {
      layout: ref('grid'),
      movies: computed(() => data.value?.results),
      total: computed(() => data.value?.totalResults),
      error,
      loading,
      page,
    }
  },
})
</script>
