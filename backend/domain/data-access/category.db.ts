import { Category } from "../model/category"
import { database } from "../../util/db.server";
import {mapToCategories, mapToCategory} from "../../mapper/category.mapper"


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



export default {
    getCategoryById,
    getAllCategories
}