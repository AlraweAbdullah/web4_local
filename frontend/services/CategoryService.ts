const getAllCategories = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/categories",{
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`
    
        }
    })
}


const addCategory =  async ({name}:{name:string})=>{
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories",
    {
        body: JSON.stringify({name:name}),
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization:  `Bearer ${sessionStorage.getItem("token")}`

        }
    })

}



const CategoryService = {
    getAllCategories,
    addCategory
}

export default CategoryService