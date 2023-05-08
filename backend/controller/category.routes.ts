/**
* @swagger
*   components:
*    schemas:
*      Category:
*        type: object
*        properties:
*          id: 
*            type: number
*            format: int64
*          name: 
*            type: string
*            description: Category name
*/


import express, {Request, Response} from "express"
import categoryService from "../service/category.service"
const categoryRouter = express.Router()


/**
*  @swagger
* /categories:
*   get:
*     summary: Get list of categories.
*     responses:
*       200:
*         description: List of all categories
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Country'
*       404:
*         description: Error
*    
*/
categoryRouter.get("/",async (req:Request, res:Response) =>{
    try{
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})

/**
* @swagger
* /categories/{id}:
*   get:
*     summary: Get a category by id.
*     responses:
*       200:
*         description: Returns a category, if not then an error is returned 
*         content:
*           application/json:
*             schema:
*                $ref: '#/components/schemas/Category'
*     parameters :
*        - name: id
*          in: path
*          description: id of the category
*          required: true
*          type: integer
*          format: int64    
*    
*/
categoryRouter.get("/:id",async (req:Request, res:Response) =>{
    try{
        const int:number = parseInt(req.params.id)
        const category = await categoryService.getCategoryById({id: int});
        res.status(200).json(category)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})



export {categoryRouter}