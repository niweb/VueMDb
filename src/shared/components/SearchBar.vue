<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import AutoComplete from 'primevue/autocomplete/AutoComplete'
import { useMovieApi } from '@/shared/services/useMovieApi'
import { PartialMovie, PartialShow } from '@/modules/movies/types'
import { ImagePath, MultiPageResponse } from '@/shared/services/movieApi'
import Poster from '@/modules/movies/components/Poster.vue'
import { PathNames } from '@/shared/constants/path-names'
import { useRouter } from 'vue-router'

enum MediaType {
  Movie = 'movie',
  Tv = 'tv',
  Person = 'person',
}

type ApiResult = (PartialShow | PartialMovie) & {
  mediaType: MediaType
}

type Suggestion = {
  type: MediaType
  id: number
  posterPath: ImagePath | null
  title: string
  year: string
}

export default defineComponent({
  components: {
    AutoComplete,
    Poster,
  },

  setup() {
    const router = useRouter()
    const query = ref<string>('')
    const value = ref<Suggestion | string | null>(null)

    const { data } = useMovieApi<MultiPageResponse<ApiResult>>(
      '/search/multi',
      reactive({
        query,
      })
    )

    const suggested = computed(() => {
      if (!data.value) return []
      return data.value.results
        .filter(
          // Only include supported media types
          (item) =>
            item.mediaType === MediaType.Movie ||
            item.mediaType === MediaType.Tv
        )
        .map(
          // Map complex result to slimmer object, that can be more easily consumed across this component
          (item: ApiResult) => ({
            type: item.mediaType,
            id: item.id,
            posterPath: item.posterPath,
            title: (item as PartialMovie).title || (item as PartialShow).name,
            year: (
              (item as PartialMovie).releaseDate ||
              (item as PartialShow).firstAirDate
            )?.split('-')[0],
          })
        )
    })

    return {
      selected: value,
      suggested,

      search(inputValue: string) {
        if (inputValue.trim().length > 0) {
          query.value = inputValue
        } else {
          query.value = ''
        }
      },

      select(item: Suggestion) {
        const path =
          item.type === MediaType.Movie
            ? PathNames.MOVIE
            : item.type === MediaType.Tv
            ? PathNames.SHOW
            : PathNames.NOT_FOUND
        router.push({
          name: path,
          params: {
            id: item.id,
          },
        })
        value.value = null
      },
    }
  },
})
</script>

<template>
  <span class="p-input-icon-left autocomplete-wrapper">
    <i class="pi pi-search" />
    <AutoComplete
      v-model="selected"
      field="title"
      :suggestions="suggested"
      scroll-height="500px"
      class="autocomplete"
      @complete="search($event.query)"
      @item-select="select($event.value)"
    >
      <template #item="slotProps">
        <div class="p-d-flex autocomplete-suggestion-item">
          <Poster
            :key="slotProps.item.posterPath"
            class="autocomplete-suggestion-image"
            :path="slotProps.item.posterPath"
            :title="slotProps.item.title"
            :width="92"
          ></Poster>
          <div class="p-px-3">
            <div class="p-text-bold">
              {{ slotProps.item.title }}
            </div>
            <div>
              {{ slotProps.item.year }}
            </div>
          </div>
        </div>
      </template>
    </AutoComplete>
  </span>
</template>

<style lang="stylus">
.autocomplete-wrapper
  position relative

  i
    position absolute
    z-index 1

.autocomplete input
  padding-left 1.75rem

.autocomplete-suggestion-item
  max-width 400px

.autocomplete-suggestion-image
  height 90px
</style>
