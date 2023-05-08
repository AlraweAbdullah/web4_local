
export type BookInput = {
    id: number
    title: string
    pages: number
    authorId: number
    categoryIds: number[]
}

export type AuthorInput = {
    id: number
    name: string
    country: CountryInput
}

export type CountryInput = {
    id: number
    name: string
}