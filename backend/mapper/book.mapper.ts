import { Book } from "../domain/model/book"
import { BookPrisma, CategoryPrisma } from "../util/db.server"
import { mapToAuthor } from "./author.mapper"
import { mapToCategories } from "./category.mapper"

const mapToBook =({
    id,
    pages,
    title,
    categories,
    author,
}: BookPrisma & {categories: CategoryPrisma[]}):
Book => Book.create(id, pages, title, mapToCategories(categories), mapToAuthor(author))
 
    

const mapToBooks = (bookPrisma: BookPrisma[]): Book[]  => {
   return bookPrisma.map(mapToBook)

}

export  {
    mapToBook, mapToBooks
}