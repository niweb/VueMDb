import { ImagePath } from '@/shared/services/movieApi'
import {
  Country,
  DateString,
  Genre,
  Language,
  ProductionCompany,
} from '@/modules/movies/types/shared'

type Network = {
  id: number
  name: string
}

type Season = {
  airDate: DateString
  episodeCount: number
  id: number
  posterPath: ImagePath | null
  seasonNumber: number
}

enum ShowStatus { //todo: options?
  Reality = 'Reality',
}

enum Type { //todo: options?
  Reality = 'Reality',
}

export type FullShow = {
  backdropPath: ImagePath | null
  createdBy: [] //todo: type?
  episodeRunTime: number[]
  firstAirDate: DateString
  genres: Genre[]
  homepage: string
  id: number
  inProduction: true
  languages: Array<Language['iso6391']>
  lastAirDate: DateString
  name: string
  networks: Network[]
  numberOfEpisodes: number
  numberOfSeasons: number
  originCountry: Country['iso31661'][]
  originalLanguage: Language['iso6391']
  originalName: string
  overview: string | null
  popularity: number
  posterPath: ImagePath | null
  productionCompanies: ProductionCompany[]
  seasons: Season[]
  status: ShowStatus
  type: Type
  voteAverage: number
  voteCount: number
}

export type PartialShow = Pick<
  FullShow,
  | 'posterPath'
  | 'popularity'
  | 'id'
  | 'backdropPath'
  | 'voteAverage'
  | 'overview'
  | 'firstAirDate'
  | 'originCountry'
  | 'originalLanguage'
  | 'voteCount'
  | 'name'
  | 'originalName'
> & {
  genreIds: Genre['id'][]
}
