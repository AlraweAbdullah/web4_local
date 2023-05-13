/**
* @swagger
*   components:
*    schemas:
*      Book:
*        type: object
*        properties:
*          id: 
*            type: number
*            format: int64
*          pages: 
*            type: number
*            format: int64
*            description: Page numbers
*          title:
*            type: string
*          authorId:
*            type: number
*            formar: int64
*            description: Author id
*            items: 
*               $ref: '#/components/schemas/Author'
*          categories:
*            type: array
*            items: 
*               $ref: '#/components/schemas/Category' 
*
*      BookInput:
*        type: object
*        properties:
*          id:
*            type: number
*            format: int64
*            description : Id of hte updated book
*          title: 
*            type: string
*            description: Book title
*          pages: 
*            type: number
*            format: int64
*          authorId:
*            type: number
*            format: int64
*            description: Id of the author we should already have an author id to link the book to it
*          categoryIds:
*            type: array
*            items:
*               type: number
*               format: int64
*            description: Category ids, we should already have the category id to link the book to it
*           
*/
import express, {Request, Response} from "express"
import bookService from "../service/book.service"
import type { BookInput } from "../types/types"
const bookRouter = express.Router()

/**
* @swagger
* /books:
*   post:
*     summary: Add a book to an author and link it to an existing category
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/BookInput'
*     responses:
*       200:
*         description: The new book
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Book'
*       404:
*         description: Error
*/



bookRouter.post('/', async(req:Request, res: Response) => {
    const newBook = <BookInput>req.body
    try {
        const book = await bookService.addBook(newBook)
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})



/**
* @swagger
* /books:
*   get:
*     summary: Get list of books including a list of book category.
*     responses:
*       200:
*         description: List of all books
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Book'
*       404:
*         description: Error
*    
*/
bookRouter.get("/",async(req:Request, res:Response) =>{
    try{
        const books = await bookService.getAllBooks();
        res.status(200).json(books)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})


/**
* @swagger
* /books/{id}:
*   get:
*     summary: Get a book by id including a list of book category.
*     responses:
*       200:
*         description: Returns a boook, if not then an error is returned 
*         content:
*           application/json:
*             schema:
*                $ref: '#/components/schemas/Book'
*     parameters :
*        - name: id
*          in: path
*          description: id of the book
*          required: true
*          type: integer
*          format: int64    
*    
*/
bookRouter.get("/:id",async (req:Request, res:Response) =>{
    try{
        const id:number = parseInt(req.params.id)
        const book = await bookService.getBookById({id: id});
        res.status(200).json(book)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
    
})


/**
* @swagger
* /books/title/{title}:
*   get:
*     summary: Get  books by their titles .
*     responses:
*       200:
*         description: Returns books or throw an error
*         content:
*           application/json:
*             schema:
*                $ref: '#/components/schemas/Book'
*     parameters :
*        - name: title
*          in: path
*          description: id of the book
*          required: true
*          type: string
*    
*/
bookRouter.get("/title/:title",async (req:Request, res:Response) =>{
    try{
        const title:string = req.params.title
        const books = await bookService.getBookByTitle({title: title});
        res.status(200).json(books)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})


/**
* @swagger
* /books/{id}:
*   delete:
*     summary: Delete  a book by id
*     responses:
*       200:
*         description: Returns the deleted boook, if not then an error is returned 
*         content:
*           application/json:
*             schema:
*                $ref: '#/components/schemas/Book'
*     parameters :
*        - name: id
*          in: path
*          description: id of the book
*          required: true
*          type: integer
*          format: int64    
*    
*/
bookRouter.delete("/:id",async (req:Request, res:Response) =>{
    try{
        const id:number = parseInt(req.params.id)
        const deleteBook = await bookService.deleteBookById({id: id});
        res.status(200).json(deleteBook)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})




/**
* @swagger
* /books:
*   put:
*     summary: Update a book
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/BookInput'
*     responses:
*       200:
*         description: The updated book
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Book'
*       404:
*         description: Error
*/
bookRouter.put("/",async (req:Request, res:Response) =>{
    const book = <BookInput>req.body
    try {
        const newBook = await bookService.updateBook(book)
        res.status(200).json(newBook)
    } catch (error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }})




export {bookRouter}