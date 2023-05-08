import Head from "next/head"
import Header from "../../components/Header"
import AuthorOverview from "../../components/authors/AuthorOverviewTable"
import AuthorService from "../../services/AuthorService"
import { useEffect, useState } from "react"
import { Author } from "../../types"


const Author: React.FC = () => {
    const [authors, setAuthors] = useState<Array<Author>>()
    
    const getAllAuthors = async () => {
        AuthorService.getAllAuthors()
        .then((res) => res.json())
        .then ((authors) => setAuthors(authors))
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAllAuthors()
    }, [])

    return (
        <>
            <Head>
                <title>Authors</title>
            </Head>
            <Header></Header>
            <main>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-6">

                        <AuthorOverview  authors = {authors}/>
                    </div>
                </section>
            </main>
        </>
    )       
}

export default Author