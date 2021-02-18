import { ImagePath } from '@/shared/services/movieApi'
export type { ImagePath } from '@/shared/services/movieApi'

export type DateString = string

export type Genre = {
  id: number
  name: string
}

export type ProductionCompany = {
  id: number
  logoPath: ImagePath
  name: string
  originCountry: Country['iso31661']
}

export type Country = {
  iso31661: string
  name: string
}

export type Language = {
  iso6391: string
  name: string
}
