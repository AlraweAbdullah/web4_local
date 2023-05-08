import { Author } from "../domain/model/author"
import authorDB from "../domain/data-access/author.db"

const getAllAuthors = async(): Promise<Author[]> => await authorDB.getAllAuthors();


const getAuthorById = async ({id}: {id: number}) : Promise<Author> => await authorDB.getAuthorById({id:id})

export default {
    getAllAuthors,
    getAuthorById,
}