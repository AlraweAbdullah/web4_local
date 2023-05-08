const getAllAuthors = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/authors")
}

const getAuthorByID = (id:number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/authors/" + id)
}



const AuthorService = {
    getAllAuthors,
    getAuthorByID
}

export default AuthorService