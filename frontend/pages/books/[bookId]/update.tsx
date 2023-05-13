import Head from "next/head"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import UpdateBook from "../../../components/books/BookUpdateForm"

const Update: React.FC = () => {
   return (
        <>
            <Head>
                <title>Update Book</title>
            </Head>
            <Header></Header>
            <h4 className="text-center mb-4">Add Book</h4>
            <main>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-4">
                        <UpdateBook />
                    </div>
                </section>
            </main> 
        <   Footer></Footer>

        </>    
    )
}

export default Update

