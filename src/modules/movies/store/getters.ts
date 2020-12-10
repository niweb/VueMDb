import { MovieState } from '@/modules/movies/store/state'
import { Movie } from '@/modules/movies/types'
import { GetterTree } from 'vuex'

export enum GETTERS {
  GET_ONE = 'GET_ONE',
  GET_ALL = 'GET_ALL',
}

export const getters: GetterTree<MovieState, MovieState> = {
  [GETTERS.GET_ONE]: state => (id: Movie['id']) => state[id],
  [GETTERS.GET_ALL]: state => Object.values(state),
}
