import { Movie } from '@/modules/movies/types'
import { MutationTree } from 'vuex'
import { MovieState } from './state'

export enum MUTATIONS {
  ADD_MANY = 'ADD_MANY',
}

export const mutations: MutationTree<MovieState> = {
  [MUTATIONS.ADD_MANY](state, payload: Movie[]) {
    payload.forEach(movie => {
      state[movie.id] = movie
    })
  },
}
