<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'

import { useMovieApi } from '@/modules/movies/functions/useMovieApi'
import MovieGridItem from '@/modules/movies/components/MovieGridItem.vue'
import { MultiPageResponse } from '@/shared/services/movieApi'
import { PartialMovie } from '@/modules/movies/types'
import InfiniteScroll from '@/shared/components/InfiniteScroll.vue'

export default defineComponent({
  components: {
    InfiniteScroll,
    MovieGridItem,
  },

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
      loadMore() {
        console.log('loadMore')
      },
    }
  },
})
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <InfiniteScroll @infiniteScroll="loadMore">
    <div class="p-grid p-jc-evenly">
      <MovieGridItem
        v-for="movie in movies"
        :key="`${movie.id}`"
        :movie="movie"
        class="p-col-4 p-md-3 p-lg-2 p-mx-3 p-my-4"
      ></MovieGridItem>
    </div>
  </InfiniteScroll>
</template>
