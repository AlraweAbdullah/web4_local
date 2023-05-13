import { User } from "../types"

const login =  async (user:User)=>{
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login",
    {
    body: JSON.stringify(user),
    method: "POST",
    headers: {
        "Content-type": "application/json"
      }
    })

}

const signup =  async (user:User)=>{
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup",
    {
    body: JSON.stringify(user),
    method: "POST",
    headers: {
        "Content-type": "application/json"
      }
    })

}



const UserService = {
    login,
    signup
}

export default UserService