<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref, watch } from 'vue'

import { useMovieApi } from '@/modules/movies/hooks/useMovieApi'
import { MultiPageResponse } from '@/shared/services/movieApi'
import { PartialMovie } from '@/modules/movies/types/movies'
import { PartialShow } from '@/modules/movies/types/shows'
import InfiniteScroll from '@/shared/components/InfiniteScroll.vue'
import { WatchableType } from '@/modules/movies/types'
import GridItem from '@/modules/movies/components/GridItem.vue'
import { PathNames } from '@/shared/constants/path-names'

export default defineComponent({
  components: {
    GridItem,
    InfiniteScroll,
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

    itemType: {
      type: String as PropType<WatchableType>,
      required: true,
    },
  },

  setup(props) {
    const page = ref(1)
    const cache = reactive(
      {} as Record<
        number,
        MultiPageResponse<PartialMovie | PartialShow> | undefined
      >
    )

    const response = useMovieApi<MultiPageResponse<PartialMovie | PartialShow>>(
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

    const collection = computed(() =>
      Object.values(cache)
        .map((res) => res?.results)
        .flat()
    )

    return {
      layout: ref('grid'),
      total: computed(() => response.data.value?.totalResults),
      error: response.error,
      loading: response.loading,
      collection,
      page,
      loadMore() {
        page.value++
      },

      detailLinkName: computed(() => {
        if (props.itemType === WatchableType.Movie) return PathNames.MOVIE
        else if (props.itemType === WatchableType.Show) return PathNames.SHOW
        return null
      }),

      getTitle(watchable: PartialShow | PartialMovie) {
        if (props.itemType === WatchableType.Movie)
          return (watchable as PartialMovie).title
        else if (props.itemType === WatchableType.Show)
          return (watchable as PartialShow).name
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
      <GridItem
        v-for="item in collection"
        :id="item.id"
        :key="item.id"
        class="p-col-4 p-md-3 p-lg-2 p-mx-3 p-my-4"
        :title="getTitle(item)"
        :detail-link-name="detailLinkName"
        :poster-path="item.posterPath"
        :vote-average="item.voteAverage"
      >
      </GridItem>
    </div>
  </InfiniteScroll>
</template>
