
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
    country: string
}

export type CountryInput = {
    id: number
    name: string
}

export type CategoryInput = {
    id: number
    name : string
}

export type UserInput = {
    username: string
    password: string
}