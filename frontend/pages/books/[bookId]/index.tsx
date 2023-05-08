import { useRouter } from "next/router"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"

import BookOverview from "../../../components/books/BookInfoTable"
import BookService from "../../../services/BookService"
import { useEffect, useState } from "react"
import Head from "next/head"
import { Book } from "../../../types"


const BookInfo: React.FC = () =>{
    const router = useRouter()

    const [book, setBook] = useState<Book>()

    const getbookInfo = async ()=> {
        const bookId =  Number(router.query.bookId)
        BookService.getBookById({id:bookId}).
        then((res) => res.json()).
        then((book) => setBook(book))
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() =>{
        if(router.isReady){
            getbookInfo()
        }
    },[router.isReady])

    return ( 
        <>
            <Head>
                <title>Book Info</title>
            </Head>
            <Header></Header>
            
            <main>
                <section className="row justify-content-center min-vh-100">
                    <BookOverview book={book}/>
                </section>
            </main>    
            <Footer></Footer>

        </> 
    )
}

export default BookInfo