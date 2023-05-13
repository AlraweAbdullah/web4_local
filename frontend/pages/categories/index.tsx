import Head from "next/head"
import Header from "../../components/Header"
import CategoriesOverview from "../../components/categories/CategoriesOverviewTable"
import CategoryService from "../../services/CategoryService"
import { useEffect, useState } from "react"
import { Author } from "../../types"


const Author: React.FC = () => {
    const [categories, setCategories] = useState<Array<Author>>()
    
    const getAllCategories = async () => {
        CategoryService.getAllCategories()
        .then((res) => res.json())
        .then ((categories) => setCategories(categories))
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <>
            <Head>
                <title>Categories</title>
            </Head>
            <Header></Header>
            <main>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-6">

                        <CategoriesOverview categories = {categories}/>
                    </div>
                </section>
            </main>
        </>
    )       
}

export default Author