import categoryDB from "../domain/data-access/category.db"
import { Category } from "../domain/model/category"

const getCategoryById = async ({id}: {id: number}) : Promise<Category> => await categoryDB.getCategoryById({id:id})

const getAllCategories = async(): Promise<Category[]> => await categoryDB.getAllCategories();

export default {
    getCategoryById,
    getAllCategories
}