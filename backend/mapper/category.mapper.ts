import { Category } from "../domain/model/category"
import { CategoryPrisma } from "../util/db.server"

const mapToCategories = (categoryPrisma: CategoryPrisma[]): Category[] => 
categoryPrisma.map(mapToCategory) 

const mapToCategory = ({id,name}:  CategoryPrisma): Category => Category.create(id, name)


export  {
    mapToCategories, mapToCategory
}