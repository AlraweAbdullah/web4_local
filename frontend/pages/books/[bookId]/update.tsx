import { useRouter } from "next/router"
import Header from "../../../components/Header"
import BookService from "../../../services/BookService"
import { useEffect, useState } from "react"
import Head from "next/head"
import { Book } from "../../../types"
import BookToUpdate from "../../../components/books/UpdateBookForm"

const BookInfo: React.FC = () =>{
    const router = useRouter()

    const [book, setBook] = useState<Book>()

    const bookToDelete = async ()=> {
        const bookId =  Number(router.query.bookId)
        BookService.getBookById({id:bookId}).
        then((res) => res.json()).     
        then((book) => {
            const hasError = book.errorMessage 
            if(hasError === undefined){
                setBook(book)
            }
            else{
                alert(hasError)
                router.push("/books")
            }
        })
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
                <section className="row justify-content-center">
                    <BookToUpdate book={book}/>
                </section>
            </main>        
        </> 
    )
}

export default BookInfo