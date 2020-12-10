import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

const API_KEY = process.env.VUE_APP_API_KEY

export type MultiPageResponse<Item> = {
  page: number
  results: Item[]
  total_pages: number
  total_results: number
}

export const movieApi = applyCaseMiddleware(
  axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      apiKey: API_KEY,
    },
  })
)
