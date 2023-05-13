import { Category } from "../model/category"
import { database, Prisma } from "../../util/db.server";
import {mapToCategories, mapToCategory} from "../../mapper/category.mapper"
import type { CategoryInput } from "../../types/types";


const getCategoryById = async ({id}: {id:number}) : Promise<Category> =>{
    try{
        const category = await database.category.findUnique({
            where :{id: id},
        })
        return mapToCategory(category)
    }catch (error){
        throw new Error(`Category with id {${id}} couldn't be found`)
    }

}

const getAllCategories = async () : Promise<Category[]> =>{
    const categories = await database.category.findMany({
    })
    return mapToCategories(categories)
}


const addCategory = async ({newCategory}:{newCategory:CategoryInput}) => {
    try {
        return  await database.category.create({
            data:{
                name: newCategory.name
            }
        })       

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error(`Category with name {${newCategory.name}} already exists`) 
            }
        }
        throw new Error(error.message)
    }

}


export default {
    getCategoryById,
    getAllCategories,
    addCategory
}