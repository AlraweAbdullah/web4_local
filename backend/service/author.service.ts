import { Author } from "../domain/model/author"
import authorDB from "../domain/data-access/author.db"
import { AuthorInput } from "../types/types";

const getAllAuthors = async(): Promise<Author[]> => await authorDB.getAllAuthors();


const getAuthorById = async ({id}: {id: number}) : Promise<Author> => await authorDB.getAuthorById({id:id})

const addAuthor = async ({name,country}:AuthorInput): Promise<Author> => await authorDB.addAuthor({name, country})

export default {
    getAllAuthors,
    getAuthorById,
    addAuthor
}