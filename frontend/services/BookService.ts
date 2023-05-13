import { Book } from "../types"

const getAllBooks = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL+ "/books",{
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
        }

    })
}

const getBookById = async ({id}:{id:number}) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL+ "/books/" + id,{
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
        }
    })
}

const deleteBookById = async ({id}:{id:number}) => {
    return  await fetch(process.env.NEXT_PUBLIC_API_URL+ `/books/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
        }
    })

}

const getBookByTitle = async ({title}: {title:string}) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+ `/books/title/${title}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
        }
    })

}


const addBook = async (book:Book) => {
   
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/books",
    {
        body: JSON.stringify(book),
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
          }
    })
}

const updateBook = async (book:Book) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/books",
    {
        body: JSON.stringify(book),
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
          }
    })
}

const BookService = {
    getAllBooks,
    getBookById,
    deleteBookById,
    getBookByTitle,
    addBook,
    updateBook
}

export default BookService