import Head from 'next/head';
import Header from "../components/Header"
import Footer from "../components/Footer"

import React from 'react'


const Home: React.FC = () => {
  return (
    <>
    
    <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
          <main>
            <section className="row justify-content-center min-vh-100">
            </section>
          </main>        
      <Footer></Footer>
    </>
  
  )
}

export default Home
