import { User } from "../domain/model/user"
import { userPrisma } from "../util/db.server"

const mapToUser = ({
    id,
    username,
    password
}:  userPrisma): User => User.create(id, username, password)



export {
    mapToUser
}