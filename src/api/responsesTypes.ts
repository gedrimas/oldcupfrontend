interface Section {
  sections: true
  _id: string
  ru: string
  ee: string
  __v: number
}
export interface Sections {
  allsections: Section[]
}

interface Contact {
  _id: string
  ru: string
  ee: string
  email: string
  phone: string
  __v: number
}
export interface Contacts {
  contacts: Contact[]
}

export interface Advert {
  allPhotos: string[]
  _id: string
  mainPhoto: string
  price: string
  ru: string
  ee: string
  sectionId: string
}

export interface Adverts {
  allAdverts: Advert[]
}

export type ResponsesTypes = Contacts | Sections | Adverts

export type NullbleT<T> = { [K in keyof T]: T[K] | null }
