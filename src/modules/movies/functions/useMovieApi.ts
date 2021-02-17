import { Ref, ref } from 'vue'
import useSWRV from 'swrv'
import { movieApi, RequestOptions } from '@/shared/services/movieApi'

type HookData<Data, Error> = {
  loading: Ref<boolean>
  data: Ref<Data | undefined>
  error: Ref<Error | undefined>
}

export const useMovieApi = <Response, Error = unknown>(
  endpoint: string,
  options?: RequestOptions
): HookData<Response, Error> => {
  const loading = ref(true)

  console.log('useMovieApi', options)

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
