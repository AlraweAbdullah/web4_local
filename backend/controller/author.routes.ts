/**
* @swagger
*   components:
*    schemas:
*      Author:
*        type: object
*        properties:
*          id: 
*            type: number
*            format: int64
*          name: 
*            type: string
*            description: Author name
*          books:
*            type: array
*            description: List of all the books of the author
*            items: 
*               $ref: '#/components/schemas/Book'
*          country:
*            type: string 
*            description: Country of the author
*            items: 
*               $ref: '#/components/schemas/Country'
*
*      AuthorInput:
*        type: object
*        properties:
*          name: 
*            type: string
*            description: Author name (must be unique)
*          country: 
*            type: string
*            description: Author name
*           
*/       

import express, {Request, Response} from "express"
import authorService from "../service/author.service"
import { AuthorInput } from "../types/types";
const authorRouter = express.Router()
/**
* @swagger
* /authors:
*   get:
*     summary: Get list of authors.
*     responses:
*       200:
*         description: List of all authors
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Author'
*       404:
*         description: Error
*    
*/
authorRouter.get("/",async(req:Request, res:Response) =>{
    try{
        const authors = await authorService.getAllAuthors();

        res.status(200).json(authors)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})


/**
* @swagger
* /authors/{id}:
*   get:
*     summary: Get an author by id.
*     responses:
*       200:
*         description: Returns an author, if not then an error is returned 
*         content:
*           application/json:
*             schema:
*                $ref: '#/components/schemas/Author'
*     parameters :
*        - name: id
*          in: path
*          description: id of the author
*          required: true
*          type: integer
*          format: int64    
*    
*/
authorRouter.get("/:id",async (req:Request, res:Response) =>{
    try{
        const id:number = parseInt(req.params.id)
        const author = await authorService.getAuthorById({id: id});
        res.status(200).json(author)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})

/**
* @swagger
* /authors:
*   post:
*     summary: Add an author
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/AuthorInput'
*     responses:
*       200:
*         description: The new author
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Author'
*       404:
*         description: Error
*/

authorRouter.post("/",async(req:Request, res: Response) =>{
    const newAuthor = <AuthorInput>req.body
    try {
        const author = await authorService.addAuthor(newAuthor)
        res.status(200).json(author)
    } catch (error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})

export {authorRouter}