import Head from "next/head"
import Header from "../../components/Header"
import AuthorOverview from "../../components/authors/AuthorOverview"
import AuthorService from "../../services/AuthorService"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router';


const Author: React.FC = () => {
    const router = useRouter()
    const [author, setAuthor] = useState()
    const authorId =  Number(router.query.authorId)

    const getAuthorByID = async () => {
        AuthorService.getAuthorByID(authorId)
        .then((res) => res.json())
        .then ((author) => setAuthor(author))
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if(router.isReady){
            getAuthorByID()
        }
    },[router.isReady])

    return (
        <>
            <Head>
                <title>AuthorInfo</title>
            </Head>
            <Header></Header>
            <main>
                <section className="row justify-content-center">
                    <AuthorOverview  author = {author}/>
                </section>
            </main>
        </>
    )       
}

export default Author