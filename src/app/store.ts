import { createStore } from 'vuex'
import movies from '@/modules/movies/store'
import { MODULES } from '@/shared/constants/store-modules'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    [MODULES.MOVIES]: movies,
  },
})
