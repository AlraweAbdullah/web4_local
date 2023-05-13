import { Book } from "../domain/model/book"
import authorService from "./author.service"
import categoryService from "./category.service"
import bookDB from "../domain/data-access/book.db"

import type { BookInput } from "../types/types"

const addBook = async (BookInput:BookInput):Promise<Book> =>{
    await handleBookInput(BookInput)
    return await bookDB.addBook(BookInput)
}


const updateBook = async (BookInput:BookInput):Promise<Book> => {

    await handleBookInput(BookInput)

    // Check if book exists 
    await getBookById({id:BookInput.id})
    return await bookDB.updateBook(BookInput)
}

const getBookById = async ({id}: {id: number}) : Promise<Book> => await bookDB.getBookById({id:id})

const getAllBooks = async(): Promise<Book[]> => await bookDB.getAllBooks();

const deleteBookById = async ({id}:{id: number}) => await bookDB.deleteBookById({id: id})

const getBookByTitle = async ({title}:{title: string}) : Promise<Book[] | Error> =>  await bookDB.getBookByTitle({title: title})


const handleBookInput = async ({title,pages, authorId, categoryIds}:BookInput) => {
    if(!title || title.trim() === ""){
        throw new Error("Title can't be empty.")
    }

    if(!pages){
        throw new Error("Pages numbers must be positive number.")
    }

    if(!authorId){
        throw new Error("Author id can't be empty.")
    }


    if(!categoryIds || categoryIds.length === 0){
        throw new Error("Categories can't be empty.")
    }

    // check if author exists
    await authorService.getAuthorById({id: authorId})


    // check if category ids exist
    for(let id=0; id<categoryIds.length;id++){
        await categoryService.getCategoryById({id: categoryIds[id]})
    }    
}
export default {
    addBook,
    getAllBooks,
    getBookById,
    deleteBookById,
    getBookByTitle,
    updateBook
}