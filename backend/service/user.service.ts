import { UserInput } from "../types/types"
import bcrypt from "bcrypt"
import userDB from "../domain/data-access/user.db"
import { User } from "../domain/model/user"
import jwt from "jsonwebtoken"


const jwtSecret = process.env.JWT_SECRET
const genrateJwtToken = (username: string):string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: "BookHub"}
    try {
        return jwt.sign({username}, jwtSecret, options)
    } catch (error) {
        console.log(error)
        throw new Error("Error genrating JWT token")
    }
}

const createUser = async ({username, password}:UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByUserName(username)
    if(existingUser){
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    return await userDB.createUser({username, password:hashedPassword})
}

const authenticate = async ({username, password}:UserInput) :Promise<string>=> {
    const user = await getUserByUserName(username)
    if(!user){
        throw new Error("User couldn't be found")
    }
    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword){
        throw new Error("Incorrect password")
    }

    return genrateJwtToken(username)
}

const getUserByUserName = async (username:string) => userDB.getUserByUserName(username)



export default {
    createUser,
    authenticate
}