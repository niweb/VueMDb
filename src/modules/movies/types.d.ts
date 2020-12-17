import { ImagePath } from '@/shared/services/movieApi'

type Locale = string
type DateString = string

type Genre = {
  id: number
}

export type Movie = {
  id: number
  title: string
  adult: boolean
  backdropPath: ImagePath
  genreIds: Genre['id'][]
  originalLanguage: Locale
  originalTitle: string
  overview: string
  popularity: number
  posterPath: ImagePath
  releaseDate: DateString
  video: boolean
  voteAverage: number
  voteCount: number
}
