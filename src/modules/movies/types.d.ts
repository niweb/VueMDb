import { ImagePath } from '@/shared/services/movieApi'

type DateString = string

type Genre = {
  id: number
  name: string
}

type ProductionCompany = {
  id: number
  logoPath: ImagePath
  name: string
  originCountry: Country['iso31661']
}

type Country = {
  iso31661: string
  name: string
}

type Language = {
  iso6391: string
  name: string
}

enum Status {
  RUMORED = 'Rumored',
  PLANNED = 'Planned',
  IN_PRODUCTION = 'In Production',
  POST_PRODUCTION = 'Post Production',
  RELEASED = 'Released',
  CANCELED = 'Canceled',
}

export type PartialMovie = Pick<
  FullMovie,
  | 'adult'
  | 'backdropPath'
  | 'id'
  | 'originalLanguage'
  | 'originalTitle'
  | 'overview'
  | 'popularity'
  | 'posterPath'
  | 'releaseDate'
  | 'title'
  | 'video'
  | 'voteAverage'
  | 'voteCount'
> & {
  genreIds: Genre['id'][]
}

export type FullMovie = {
  adult: boolean
  backdropPath: ImagePath | null
  belongsToCollection: null
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdbId: string
  originalLanguage: Language['iso6391']
  originalTitle: string
  overview: string
  popularity: number
  posterPath: ImagePath | null
  productionCompanies: ProductionCompany[]
  productionCountries: Country[]
  releaseDate: DateString
  revenue: number
  runtime: number
  spokenLanguages: Language[]
  status: Status
  tagline: string
  title: string
  video: boolean
  voteAverage: number
  voteCount: number
}
