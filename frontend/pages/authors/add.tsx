import Head from "next/head"
import Header from "../../components/Header"
import { Button, Form } from "react-bootstrap"
import { useState } from "react"
import { useRouter } from "next/router"
import StatusMessageParser from "../../components/StatusMessageParser"
import Footer from "../../components/Footer"
import AuthorService from "../../services/AuthorService"
import { Author } from "../../types"

const AddAuthor: React.FC = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")

    const [nameError, setNameError] = useState("")
    const [countryError, setCountryError] = useState("")

    
    const [statusMessage, setStatusMessage] = useState(null)



    const validate = (): boolean => {
        let isValid = true
        setNameError("")
        setCountryError("")

        setStatusMessage(null)

        if(!name && name.trim() === ""){
            setNameError("Name can't be empty")
            isValid = false
        }

        if(!country && country.trim() === ""){
            setCountryError("Country can't be empty")
            isValid = false
        }           
        return isValid
    }



    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!validate()){
            return 
        } 

        const author:Author = {
            name,
            country
        }
        
        const response = await AuthorService.addAuthor(author)
        const data = await response.json()
        if(response.status === 200){
            setStatusMessage({
                type: "success",
                message: "Successfully added"
            })
                    
            setTimeout(() => {
                router.push("/authors")
            },2000)
        
        }else if(response.status === 401){
            setStatusMessage({
                type: "unauthorized",
                message: data.errorMessage
            })
        }else {
            setStatusMessage({
                type: "error",
                message: data.errorMessage
            })
        }
    }

    return (
    <>
        <Head>
            <title>Add Author</title>
        </Head>
        <Header></Header>
        <h4 className="text-center mb-4">Add Author</h4>
        <main>
            <section className="row justify-content-center min-vh-100">
                <div className="col-4">
                <StatusMessageParser statusMessage={statusMessage}/>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control id="name" type="text" value={name} onChange={(event)=> {setName(event.target.value)}}/>
                            <Form.Text  className="text-muted">
                                {nameError && <div className="text-danger">{nameError}</div>}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="country">Country</Form.Label>
                            <Form.Control id="country" type="text" value={country} onChange={(event)=> {setCountry(event.target.value)}}/>
                            <Form.Text className="text-muted">
                                {countryError && <div className="text-danger">{countryError}</div>}
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

export default AddAuthor

