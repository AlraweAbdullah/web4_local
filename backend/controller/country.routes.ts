/**
* @swagger
*   components:
*    schemas:
*      Country:
*        type: object
*        properties:
*          id: 
*            type: number
*            format: int64
*          name: 
*            type: string
*            description: Country name
*      CountryInput:
*        type: object
*        properties:
*          id: 
*            type: number
*            format: int64
*            required: true
*          name: 
*            type: string
*            required: true
*            description: New country name(must be uniqe)
*/
import express, {Request, Response} from "express"
import countryService from "../service/country.service"
import { CountryInput } from "../types/types"
const countryRouter = express.Router()

/**
* @swagger
* /countries/{id}:
*   get:
*     summary: Get a country by id.
*     responses:
*       200:
*         description: Returns a country, if not then an error is returned 
*         content:
*           application/json:
*             schema:
*                $ref: '#/components/schemas/Country'
*     parameters :
*        - name: id
*          in: path
*          description: id of the country
*          required: true
*          type: integer
*          format: int64    
*    
*/
countryRouter.get("/:id",async (req:Request, res:Response) =>{
    try{
        const int:number = parseInt(req.params.id)
        const country = await countryService.getCountryById({id: int});
        res.status(200).json(country)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})


/**
* @swagger
* /countries:
*   put:
*     summary: Update country name
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Country'
*     responses:
*       200:
*         description: The new country
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Country'
*       404:
*         description: Error
*/
countryRouter.put("/",async (req:Request, res:Response) =>{
    const countryInput = <CountryInput>req.body
    try {
        const country = await countryService.updateCountry(countryInput)
        res.status(200).json(country)
    } catch (error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})



/**
 * @swagger
* /countries:
*   get:
*     summary: Get list of countries.
*     responses:
*       200:
*         description: List of all countries
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Country'
*       404:
*         description: Error
*    
*/
countryRouter.get("/",async(req:Request, res:Response) =>{
    try{
        const countries = await countryService.getAllCountries();
        res.status(200).json(countries)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})

export {countryRouter}