import { database } from "../../util/db.server"
import { User } from "../model/user"
import { mapToUser } from "../../mapper/user.mapper";

const createUser = async ({username, password}:{username:string,password:string}): Promise<User> => {
   try {
    const userPrisma = await database.user.create({
        data:{
            username,
            password
        },
    });
    return mapToUser(userPrisma)
   } catch (error) {
       throw new Error("Database error")
   }
}


const getUserByUserName = async (username:string) : Promise<User>=> {
        const userPrisma= await database.user.findUnique({
            where:{
                username
            }
        })

        if(userPrisma){
            return mapToUser(userPrisma)
        }
}
export default{
    createUser,
    getUserByUserName
}