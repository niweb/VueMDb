import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

export type ImagePath = string

const API_KEY = process.env.VUE_APP_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export type MultiPageResponse<Item> = {
  page: number
  results: Item[]
  totalPages: number
  totalResults: number
}

export type RequestOptions = Partial<{
  language: string
  page: number
  query: string
}>

export const movieApi = applyCaseMiddleware(
  axios.create({
    baseURL: BASE_URL,
    params: {
      apiKey: API_KEY,
    },
  })
)

type ImagePathOptions = {
  hq?: boolean
  width?: number
}

export const getImagePath = (
  path: ImagePath,
  options?: ImagePathOptions
): string => {
  const imageName = path.startsWith('/') ? path.substring(1) : path
  const width = options?.hq ? 'original' : `w${options?.width || 500}`
  return `${IMAGE_BASE_URL}/${width}/${imageName}`
}
