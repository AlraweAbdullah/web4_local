import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

import BooksOverview from "../../components/books/BooksOverviewTable"
import BookService from "../../services/BookService"
import { useEffect, useState } from "react"
import { Book } from "../../types"

const Books: React.FC = () => {
    const [books, setBooks] = useState(Array<Book>)
    
    const getBooks = async () => {
        const booksPromis = BookService.getAllBooks()

        booksPromis
            .then((res) => res.json())
            .then ((books) => setBooks(books))
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getBooks()

    }, [])

    return (
        <>
            <Head>
                <title>Books</title>
            </Head>
            <Header></Header>
            <main>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-6">
                        <BooksOverview books={books}/>
                    </div>                
                </section>
            </main>
            <Footer></Footer>
        </>
    )       
}

export default Books