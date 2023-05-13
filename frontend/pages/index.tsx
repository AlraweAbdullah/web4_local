import Head from 'next/head';
import Header from "../components/Header"
import Footer from "../components/Footer"
import SignForm from '../components/users/signForm';

const Authintication: React.FC = () => {
    return (
        <>
        <Head>
            <title>Home</title>
          </Head>
    
          <Header></Header>
            <main className="vh-100">
               <h4 className="text-center">Authintication</h4>
                <section className="row justify-content-evenly">
                    <SignForm method="login" header="Login"/>
                    <SignForm method="signup" header="Sign up"/>
                </section>
            </main> 
          <Footer></Footer>
        </>
      
      )  
}

export default Authintication
