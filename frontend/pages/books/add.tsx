import Head from "next/head"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import AddBook from "../../components/books/BookAddForm"

const Add: React.FC = () => {
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
                        <AddBook/>
                    </div>
                </section>
            </main> 
        <   Footer></Footer>

        </>    
    )
}

export default Add

