import { useRouter } from "next/router"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"

import BookService from "../../../services/BookService"
import { useEffect, useState } from "react"
import Head from "next/head"
import { Book } from "../../../types"
import BoookToDelete from "../../../components/books/DeleteBookConfirmation"

const BookInfo: React.FC = () =>{
    const router = useRouter()

    const [book, setBook] = useState<Book>()

    const bookToDelete = async ()=> {
        const bookId =  Number(router.query.bookId)
        BookService.getBookById({id: bookId}).
        then((res) => res.json()).
        then((book) => setBook(book))
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() =>{
        if(router.isReady){
            bookToDelete()
        }
    },[router.isReady])

    return ( 
        <>
            <Head>
                <title>Delete Book</title>
            </Head>
            <Header></Header>
            
            <main>
                <section className="row justify-content-center min-vh-100">
                    <BoookToDelete book={book}/>
                </section>
            </main>        
            <Footer></Footer>
        </> 
    )
}

export default BookInfo