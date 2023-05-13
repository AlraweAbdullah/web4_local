import { mapToBook, mapToBooks } from "../../mapper/book.mapper"
import { database, Prisma} from "../../util/db.server"
import { Book } from "../model/book"

const addBook = async (
    {
        title,
        authorId,
        pages,
        categoryIds}:
    {   
        title:string,
        authorId:number,
        pages:number,
        categoryIds:number[]
    }
    
    ):Promise<Book> => {
    
    try {
        const bookPrisma = await database.book.create({
            data:{
                title:title,
                pages:pages,
                author:{
                    connect:{id:authorId}
                },
                categories:{ 
                    connect: categoryIds.map((categoryId) => ({ id: categoryId })),
                }
            },
            include:{
                categories: true,
                author: {include : {country:true}}
            },
        });
        return mapToBook(bookPrisma)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(`Author with id {${authorId}} already have book with title {${title}}`) 
            }
        }
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

const updateBook = async ({
    id,
    title,
    pages,
    authorId,
    categoryIds
}:{
    id: number,
    title: string,
    pages: number,
    authorId: number,
    categoryIds: number []
}):Promise<Book> => {
      try {
        const bookPrisma = await database.book.update({
            where: {
              id:id
            },
            data: {
                title: title,
                pages: pages,
                author:{
                    connect:{
                        id : authorId
                    }
                },
                categories:{
                    set:[],
                    connect:categoryIds.map((categoryId) => ({ id: categoryId }))
                }
            },
            include:{
                categories: true,
                author: {include : {country:true}}
            }});
        return mapToBook(bookPrisma)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(`Author with id {${authorId}} already have book with title {${title}}`) 
            }
        }
        throw new Error(error.message)     }
}

export default {
    addBook,
    getAllBooks,
    getBookById,
    deleteBookById,
    getBookByTitle,
    updateBook
}