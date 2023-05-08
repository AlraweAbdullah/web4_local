const getAllCategories = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/categories")
}




const CategoryService = {
    getAllCategories,
}

export default CategoryService