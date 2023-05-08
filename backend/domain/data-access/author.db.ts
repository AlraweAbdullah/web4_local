import { Author } from "../model/author";
import { database } from "../../util/db.server";
import { mapToAuthor, mapToAuthors } from "../../mapper/author.mapper";
import { AuthorInput } from "../../types/types";




const getAllAuthors = async (): Promise<Author[]> => {
    const authors = await database.author.findMany({
        include: {country:true}

    })
    return mapToAuthors(authors)
}
const getAuthorById = async ({id}: {id:number}) : Promise<Author> =>{
    try{
        const author = await database.author.findUnique({
            where :{id: id},
            include: {country:true}
        })
        return mapToAuthor(author)

    }catch(error){
        throw new Error(`Author with id {${id}} couldn't be found`)

    }
}


const addAuthor = async ({newAuthor}:{newAuthor: AuthorInput}): Promise<Author> => {
    try {
        const authorPrisma = await database.author.create({
            data:{
                name:newAuthor.name,
                country:{
                connectOrCreate:{
                    where:{
                        name:newAuthor.country.name
                    },
                    create:{
                        name: newAuthor.country.name
                    }
                }
               }
            }, 
            include:{country:true}
        })
        return mapToAuthor(authorPrisma)
    } catch (error) {
        throw new Error(error.message) 
    }

}



export default {
    getAllAuthors,
    getAuthorById,
    addAuthor,
}