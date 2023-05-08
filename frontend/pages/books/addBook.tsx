import Head from "next/head"
import Header from "../../components/Header"

const AddBook : React.FC =() => {
    
    return (
    <>
            <Head>
                <title>AddBook</title>
            </Head>
       <Header></Header>
       <h4 className="text-center mb-4">Add Book</h4>

    </>

    )
}

export default AddBook