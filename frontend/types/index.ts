export interface Country{
    id : number
    name: string
}

export interface Book{
    id: number
    title: string
    pages: number
    categories: Category[]
    author: Author
}

export interface Author{
    id: number
    name: string
    country: Country
}

export interface Category{
    id: number
    name: string
}

export interface StatusMessage{
    type: string
    message: string
}

