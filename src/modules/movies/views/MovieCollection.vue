<template>
  <div v-if="error">
    {{ error }}
  </div>
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
      <MovieList :movie="data" :key="`${data.id}`"></MovieList>
    </template>
    <template #grid="{ data }">
      <MovieGridItem
        class="p-mx-4 p-my-2"
        :movie="data"
        :key="`${data.id}`"
      ></MovieGridItem>
    </template>
  </DataView>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'

import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'

import { useMovieApi } from '@/modules/movies/functions/useMovieApi'
import MovieList from '@/modules/movies/components/MovieList.vue'
import MovieGridItem from '@/modules/movies/components/MovieGridItem.vue'
import { MultiPageResponse } from '@/shared/services/movieApi'
import { PartialMovie } from '@/modules/movies/types'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
  },

  components: {
    DataView,
    DataViewLayoutOptions,
    MovieList,
    MovieGridItem,
  },

  setup(props) {
    const page = ref(1)

    const { data, error, loading } = useMovieApi<
      MultiPageResponse<PartialMovie>
    >(
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
