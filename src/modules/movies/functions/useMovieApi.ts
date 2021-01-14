import { ref } from 'vue'
import useSWRV from 'swrv'
import {
  movieApi,
  MultiPageRequestOptions,
  MultiPageResponse,
} from '@/shared/services/movieApi'
import { Movie } from '@/modules/movies/types'

export const useMovieApi = (
  endpoint: string,
  options?: MultiPageRequestOptions
) => {
  const loading = ref(true)

  const { data, error } = useSWRV(
    () => `${endpoint}/${options?.page}`,
    async () => {
      const response = await movieApi.get<MultiPageResponse<Movie>>(endpoint, {
        params: options,
      })
      loading.value = false
      return response.data
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  )

  return {
    loading,
    error,
    data,
  }
}
