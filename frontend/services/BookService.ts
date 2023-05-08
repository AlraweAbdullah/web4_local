import { Book } from "../types"

const getAllBooks = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL+ "/books")
}

const getBookById = async ({id}:{id:number}) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL+ "/books/" + id)
}

const deleteBookById = async ({id}:{id:number}) => {
    return  await fetch(process.env.NEXT_PUBLIC_API_URL+ "/books/" + id, {
        method: 'DELETE',
    })

}

const getBookByTitle = async ({title}: {title:string}) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+ "/books/title/" + title)
}

const addBook = async ({title, authorId, categoryIds, pages}:{title:string, authorId:number, categoryIds:number[], pages:number}) => {
   
    console.log(categoryIds)
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/books",
    {
        body: JSON.stringify({
            "title": title,
            "pages": pages,
            "authorId": authorId,
            "categoryIds": categoryIds
        }),
        method: "post",
        headers: {
            "Content-type": "application/json"
          }
    })
}

const BookService = {
    getAllBooks,
    getBookById,
    deleteBookById,
    getBookByTitle,
    addBook
}

export default BookService