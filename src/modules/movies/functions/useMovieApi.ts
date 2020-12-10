import { ref } from 'vue'
import { useStore } from 'vuex'
import { MODULES, namespaced } from '@/shared/constants/store-modules'
import { ACTIONS } from '@/modules/movies/store/actions'

export const useMovieApi = () => {
  const loading = ref(true)
  const store = useStore()

  const actionName = namespaced(MODULES.MOVIES, ACTIONS.LOAD)
  store.dispatch(actionName, 'movie/popular').then(() => {
    loading.value = false
  })

  return {
    loading,
  }
}
