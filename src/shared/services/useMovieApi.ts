import { computed, Ref } from 'vue'
import useSWRV from 'swrv'
import { movieApi, RequestOptions } from '@/shared/services/movieApi'

type HookData<Data, Error> = {
  loading: Ref<boolean>
  data: Ref<Data | undefined>
  error: Ref<Error | undefined>
}

export const useMovieApi = <Response, Error = unknown>(
  endpoint: string,
  options?: RequestOptions,
  condition?: () => boolean
): HookData<Response, Error> => {
  const { data, error, isValidating } = useSWRV(
    () => `${endpoint}/${JSON.stringify(options)}`,
    async () => {
      if (!condition || condition()) {
        const response = await movieApi.get<Response>(endpoint, {
          params: options,
        })
        return response.data
      }
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  )

  const isPending = computed(() => data.value === undefined && !error.value)
  const loading = computed(() => isValidating.value || isPending.value)

  return {
    loading,
    error,
    data,
  }
}
