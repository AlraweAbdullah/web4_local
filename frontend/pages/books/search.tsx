import Head from "next/head"
import Header from "../../components/Header"
import { useState } from "react"
import { Book, StatusMessage} from "../../types"
import BookService from "../../services/BookService"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import StatusMessageParser from "../../components/StatusMessageParser"
import BooksOverviewTable from "../../components/books/BooksOverviewTable"
import Footer from "../../components/Footer"
const SearchBooks : React.FC =() => {
    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")
    const [statusMessage, setStatusMessage] = useState<StatusMessage>(null)
    const [books, setBooks] = useState <Array<Book>>(null) 
    const validate = (): boolean => {
        setTitleError("")
        setStatusMessage(null)

        if(!title && title.trim() === ""){
            setTitleError("Title can't be empty")
            return false
        }
        return true
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
       
        if(!validate()){
            setBooks(null)
            return  
        } 
        const response = await BookService.getBookByTitle({title:title})
        const data = await response.json()

        if(response.status === 200){
            setStatusMessage({
                type: "success",
                message: "Books found"
            })
            setBooks(data)
        }else if(response.status === 500){
            setStatusMessage({
                type: "error",
                message: data.errorMessage
            })
            setBooks(null)
        }
        

    }
    

    return (
    <>

        <Head>
            <title>Search Book</title>
        </Head>
       <Header></Header>
       <h4 className="text-center mb-4">Search Book</h4>
       {/* <BookState state={statusMessage}></BookState> */}
       <main>
            <section className="row justify-content-center min-vh-100">
                <div className="col-6">
                    <StatusMessageParser statusMessage={statusMessage}/>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Book title</Form.Label>
                            <Form.Control type="text" defaultValue={title} onChange={(event)=> {setTitle(event.target.value)}}/>
                            <Form.Text className="text-muted">
                                {titleError && <div className="text-danger">{titleError}</div>}
                            </Form.Text>
                        </Form.Group>
                        <Button variant="outline-primary" type="submit">
                            Search
                        </Button>
                    </Form>
                <BooksOverviewTable books={books}/>
                </div>
            </section>
        </main>        
        <Footer></Footer>
    </>

    )
}

export default SearchBooks




