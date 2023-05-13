import categoryDB from "../domain/data-access/category.db"
import { Category } from "../domain/model/category"
import { CategoryInput } from "../types/types";

const getCategoryById = async ({id}: {id: number}) : Promise<Category> => await categoryDB.getCategoryById({id:id})

const getAllCategories = async(): Promise<Category[]> => await categoryDB.getAllCategories();

const addCategory = async ({newCategory}:{newCategory:CategoryInput}): Promise<Category> => categoryDB.addCategory({newCategory:newCategory}) 

export default {
    getCategoryById,
    getAllCategories,
    addCategory
}