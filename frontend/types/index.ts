export interface Country{
    name: string
}

export interface Book{
    title: string
    pages: number
    categoryIds: Number[]
    authorId: number
}

export interface Author{
    id : number
    name: string
    country: string
}

export interface Category{
    id: number
    name: string
}

export interface StatusMessage{
    type: string
    message: string
}



export interface User{
    username: string
    password: string
}

