import { ref } from 'vue'
import useSWRV from 'swrv'
import { movieApi, MultiPageResponse } from '@/shared/services/movieApi'
import { Movie } from '@/modules/movies/types'

export const useMovieApi = (endpoint: string) => {
  const loading = ref(true)

  const { data, error } = useSWRV(
    endpoint,
    async key => {
      const response = await movieApi.get<MultiPageResponse<Movie>>(key)
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
