import { ref } from 'vue'
import useSWRV from 'swrv'
import { movieApi, RequestOptions } from '@/shared/services/movieApi'

export const useMovieApi = <Response>(
  endpoint: string,
  options?: RequestOptions
) => {
  const loading = ref(true)

  const { data, error } = useSWRV(
    () => `${endpoint}/${JSON.stringify(options)}`,
    async () => {
      const response = await movieApi.get<Response>(endpoint, {
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
