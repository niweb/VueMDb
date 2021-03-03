import { computed, reactive, Ref } from 'vue'
import { ImagePath, MultiPageResponse } from '@/shared/services/movieApi'
import { useMovieApi } from '@/shared/services/useMovieApi'
import { PartialMovie, PartialShow } from '@/modules/movies/types'

export enum MediaType {
  Movie = 'movie',
  Tv = 'tv',
  Person = 'person',
}

type ApiResult = (PartialShow | PartialMovie) & {
  mediaType: MediaType
}

export type Suggestion = {
  type: MediaType
  id: number
  posterPath: ImagePath | null
  title: string
  year: string
}

export const useMovieApiSearch = (
  query: Ref<string>
): { suggestions: Ref<Suggestion[]> } => {
  const { data } = useMovieApi<MultiPageResponse<ApiResult>>(
    '/search/multi',
    reactive({
      query,
    }),
    () => query.value.length > 0
  )

  const suggested = computed(() => {
    if (!data.value) return []
    return data.value.results
      .filter(
        // Only include supported media types
        (item) =>
          item.mediaType === MediaType.Movie || item.mediaType === MediaType.Tv
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

  return { suggestions: suggested }
}
