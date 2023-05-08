import { mapToBook, mapToBooks } from "../../mapper/book.mapper"
import { database } from "../../util/db.server"
import { Book } from "../model/book"
import type { BookInput } from "../../types/types";
import { create } from "domain";

const addBook = async ({newBook}:{newBook: BookInput}):Promise<Book> => {
    
    try {
        const bookPrisma = await database.book.create({
            data:{
                title: newBook.title,
                author:{
                    connect:{id:newBook.authorId}
                },
                pages: newBook.pages,
                categories:{ 
                    connect: newBook.categoryIds.map((categoryId) => ({ id: categoryId })),
                }
            },
            include:{
                categories: true,
                author: {include : {country:true}}
            },
        });
        return mapToBook(bookPrisma)
    } catch (error) {
        throw new Error(error.message) 
    }

}

const getBookById = async ({id}: {id:number}) : Promise<Book> => {
    const book = await database.book.findUnique({
        where :{id: id},
        include:{
            categories:true,
            author: {include : {country:true}}
        }
    })

    if(!book){
        throw new Error(`Book with id ${id} couldn't be found`)
    }

    return mapToBook(book)
}

const getBookByTitle = async ({title}: {title:string}) : Promise<Book[] | Error> => {
    const books = await database.book.findMany({
        where :{
            title: {
                contains:title,
                mode: "insensitive"
            }
        },
        include:{
            categories:true,
            author: {include : {country:true}}
        }
    })

    const mapper = mapToBooks(books)
    if(mapper.length == 0){
        throw new Error(`Couldn't find titles that contain {${title}}`)
    }else{
        return mapper
    }

}

const getAllBooks = async () : Promise<Book[]> =>{
    const books = await database.book.findMany({
        include:{
            categories:true,
            author: {include : {country:true}}
        }
    })
    return mapToBooks(books)
}

const deleteBookById = async ({id}: {id:number}) :  Promise<Book> => {
    await getBookById({id:id})  // Check if book exists by id
    const deleteBook = await database.book.delete({
        where: {
          id: id,
        },include : {
            author:{include: {country:true}},
            categories:true

        }
      })
      return mapToBook(deleteBook)
}

const updateBook = async ({updateBook}:{updateBook: BookInput}):Promise<Book> => {
      try {
        const bookPrisma = await database.book.update({
            where: {
                id: updateBook.id
            },
            data: {
                title: updateBook.title,
                pages: updateBook.pages,
                author:{
                    connect:{
                        id : updateBook.authorId
                    }
                }
                    
            },
            include:{
                categories: true,
                author: {include : {country:true}}
            }});
        return mapToBook(bookPrisma)
    } catch (error) {
        throw new Error(error.message) 
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