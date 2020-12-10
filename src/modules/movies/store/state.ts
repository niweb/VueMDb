import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import { Movie } from '@/modules/movies/types'

export type MovieState = { [id in Movie['id']]: Movie }
export const state = {} as MovieState
