import Head from "next/head"
import Header from "../../components/Header"
import { Button, Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import StatusMessageParser from "../../components/StatusMessageParser"
import Footer from "../../components/Footer"
import AuthorService from "../../services/AuthorService"
import CategoryService from "../../services/CategoryService"

import { Author, Category } from "../../types"
import BookService from "../../services/BookService"

const AddBook: React.FC = () => {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [pages, setPages] = useState("")
    const [authorId, setAuthorId] = useState("")
    const [categoryIds, setCategoryIds] = useState<Array<number>>()

    const [titleError, setTitleError] = useState("")
    const [pagesError, setPagesErrorr] = useState("")
    const [authorIdError, setAuthorIdError] = useState("")
    const [categoryIdsError, setCategoryIdsError] = useState("")
    
    const [statusMessage, setStatusMessage] = useState(null)

    const [authors, setAuthors] = useState<Array<Author>>()
    const [categories, setCategories] = useState<Array<Category>>()


    const getAuthors = async () => {
       AuthorService.getAllAuthors().
       then((res) => res.json()).
       then(((authors) => setAuthors(authors)))
    }

    const getCategories = async () => {
        CategoryService.getAllCategories().
        then((res) => res.json()).
        then(((categories) => setCategories(categories)))
     }
   
    useEffect(() => {
        getAuthors(),
        getCategories()
    }, [])

    const validate = (): boolean => {
        let isValid = true

        setTitleError("")
        setPagesErrorr("")
        setAuthorIdError("")
        setCategoryIdsError("")

        setStatusMessage(null)

        if(!title && title.trim() === ""){
            setTitleError("Title can't be empty")
            isValid = false
        }

        if(!pages || Number.isNaN(Number(pages))){
            setPagesErrorr("Pages must be number")
            isValid = false
        }

        if(!authorId){
            setAuthorIdError("Choose an author")
            isValid = false
        }


        if(!categoryIds){
            setCategoryIdsError("Choose categories")
            isValid = false
        }
           
        return isValid
    }


    const setSelectCategories = (event) => {
        const selected = [].slice.call(event.target.selectedOptions).map(item => item.value)
        setCategoryIds(selected.map((str)=>Number(str)))
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!validate()){
            return 
        } 

        
        const response = await BookService.addBook({title:title, authorId:Number(authorId), categoryIds:categoryIds , pages:Number(pages)})
        const data = await response.json()
        if(response.status === 200){
            setStatusMessage({
                type: "success",
                message: "Successfully added"
            })
                    
            setTimeout(() => {
                router.push("/books")
            },2000)
        
        }else if(response.status === 500){
            setStatusMessage({
                type: "error",
                message: data.errorMessage
            })
        }
    }

    return (
    <>
        <Head>
            <title>Add Book</title>
        </Head>
        <Header></Header>
        <h4 className="text-center mb-4">Add Book</h4>
        <main>
            <section className="row justify-content-center min-vh-100">
                <div className="col-4">
                <StatusMessageParser statusMessage={statusMessage}/>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <Form.Control id="title" type="text" value={title} onChange={(event)=> {setTitle(event.target.value)}}/>
                            <Form.Text  className="text-muted">
                                {titleError && <div className="text-danger">{titleError}</div>}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pages">Pages</Form.Label>
                            <Form.Control id="pages" type="text" value={pages} onChange={(event)=> {setPages(event.target.value)}}/>
                            <Form.Text className="text-muted">
                                {pagesError && <div className="text-danger">{pagesError}</div>}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="selectAuthor">Authors</Form.Label>
                            <Form.Select defaultValue={'DEFAULT'} id="selectAuthor" onChange={(event)=>{
                                setAuthorId(event.target.value)}}>
                                <option value="DEFAULT" disabled>Choose existing author ...</option>
                                {authors && authors.map((author, index) => (
                                    <option  key={index} value={author.id}>{author.name} </option>
                                ))}
                            </Form.Select>
                           
                            <Form.Text>
                                {authorIdError && <div className="text-danger">{authorIdError}</div>}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="selectCategories">Categories</Form.Label>
                               <Form.Control as="select" multiple  onChange={(event)=>setSelectCategories(event)}>
                                    {categories && categories.map((category, index) => (
                                        <option  key={index} value={category.id}>{category.name} </option>
                                    ))}
                                </Form.Control>
                            <Form.Text>
                                {categoryIdsError && <div className="text-danger">{categoryIdsError}</div>}
                            </Form.Text>
                        </Form.Group>
                        <Button variant="outline-primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                 
                </div>
            </section>
        </main> 
      <Footer></Footer>

    </>    
    )
}

export default AddBook

