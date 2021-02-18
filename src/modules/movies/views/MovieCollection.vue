<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'

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
    const cache = reactive(
      {} as Record<number, MultiPageResponse<PartialMovie> | undefined>
    )

    const response = useMovieApi<MultiPageResponse<PartialMovie>>(
      props.endpoint,
      reactive({
        page,
      })
    )

    watch([response.data], () => {
      if (response.data.value) {
        cache[page.value] = response.data.value
      }
    })

    const movies = computed(() =>
      Object.values(cache)
        .map((res) => res?.results)
        .flat()
    )

    return {
      layout: ref('grid'),
      total: computed(() => response.data.value?.totalResults),
      error: response.error,
      loading: response.loading,
      movies,
      page,
      loadMore() {
        page.value++
      },
    }
  },
})
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <InfiniteScroll :loading="loading" :pixel-buffer="1250" @end="loadMore">
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
