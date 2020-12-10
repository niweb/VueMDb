import { ActionTree } from 'vuex'
import { MovieState } from '@/modules/movies/store/state'

import { movieApi } from '@/shared/services/movieApi'
import { MultiPageResponse } from '../../../shared/services/movieApi'
import { Movie } from '@/modules/movies/types'
import { MUTATIONS } from '@/modules/movies/store/mutations'

export enum ACTIONS {
  LOAD = 'LOAD',
}

export const actions: ActionTree<MovieState, MovieState> = {
  [ACTIONS.LOAD]: async ({ commit }, url: string) => {
    try {
      const response = await movieApi.get<MultiPageResponse<Movie>>(url)
      commit(MUTATIONS.ADD_MANY, response.data.results)
    } catch (e) {
      // TODO Add error handling
      console.error('error', e)
    }
  },
}
