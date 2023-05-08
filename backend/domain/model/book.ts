import { Category } from "../model/category";
import { Author } from "../model/author";


export class Book {
    readonly id: number;
    readonly pages: number;
    readonly title: string
    private readonly categories: Category []
    readonly author: Author
    constructor (book : {id:number, pages:number, title:string, categories:Category[], author:Author}){
        this.id  = book.id;
        this.pages = book.pages;
        this.title = book.title;
        this.categories = book.categories
        this.author = book.author
    }

    static create(id:number, pages:number, title:string, categories:Category[], author:Author){
        return new Book( {id:id, pages:pages, title:title, categories:categories, author:author})
    }

  
}