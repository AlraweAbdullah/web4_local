import { Author } from "../types"

const getAllAuthors = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/authors",{
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
        }

    })
}



const addAuthor =  async (author:Author) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/authors",
    {
        body: JSON.stringify(author),
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
        }
    })

}



const AuthorService = {
    getAllAuthors,
    addAuthor
}


export default AuthorService