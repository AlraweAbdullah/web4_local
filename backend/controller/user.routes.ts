/**
* @swagger
*   components:
*    schemas:
*      User:
*        type: object
*        properties:
*          id: 
*            type: number
*            format: int64
*          username: 
*            type: string
*            description: username
*          password:
*            type: string 
*            description: password
*
*      UserInput:
*        type: object
*        properties:
*          username: 
*            type: string
*            description: username (must be unique)
*          password: 
*            type: string
*            description: password
*           
*/       

import Express,{Request, Response} from "express";
import { UserInput } from "../types/types";
import userService from "../service/user.service";


const userRouter = Express.Router()


/**
* @swagger
* /users/signup:
*   post:
*     summary: Add a username
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UserInput'
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: Error
*/

userRouter.post("/signup", async(req:Request, res:Response) => {
    try {
        const userInput = <UserInput>req.body
        if(!userInput.username || !userInput.password){
            throw new Error ("Please provide username and password")
        }
        const user = await userService.createUser(userInput)
        res.status(200).json(user) 
    } catch (error) {
        res.status(500).json({status: "error" , errorMessage: error.message}) 
    }
})


/**
* @swagger
* /users/login:
*   post:
*     summary: Login
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UserInput'
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: Error
*/


userRouter.post("/login", async(req:Request, res:Response) =>{
    try {
        const userInput = <UserInput>req.body
        const token = await userService.authenticate(userInput)
        res.status(200).json({message: "Authintication succesful", token})
    } catch (error) {
        res.status(401).json({status: "Unauthorized", errorMessage: error.message})
    }
})
export {userRouter}