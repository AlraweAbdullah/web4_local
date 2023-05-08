import { Book } from "../domain/model/book"
import authorService from "./author.service"
import categoryService from "./category.service"
import bookDB from "../domain/data-access/book.db"

import type { BookInput } from "../types/types"

const addBook = async ({newBook}:{newBook:BookInput}):Promise<Book> =>{
    if(!newBook.title){
        throw new Error("Book title is an invalid title.")
    }
    // check if author exists
    await authorService.getAuthorById({id: newBook.authorId})

    // check if category ids exist
    for(let id=0; id<newBook.categoryIds.length;id++){
        await categoryService.getCategoryById({id: newBook.categoryIds[id]})
    }   
    return await bookDB.addBook({newBook : newBook})
}


const updateBook = async ({updateBook}:{updateBook:BookInput}):Promise<Book> => await bookDB.updateBook({updateBook:updateBook})

const getBookById = async ({id}: {id: number}) : Promise<Book> => await bookDB.getBookById({id:id})

const getAllBooks = async(): Promise<Book[]> => await bookDB.getAllBooks();

const deleteBookById = async ({id}:{id: number}) => await bookDB.deleteBookById({id: id})

const getBookByTitle = async ({title}:{title: string}) : Promise<Book[] | Error> =>  await bookDB.getBookByTitle({title: title})

export default {
    addBook,
    getAllBooks,
    getBookById,
    deleteBookById,
    getBookByTitle,
    updateBook
}