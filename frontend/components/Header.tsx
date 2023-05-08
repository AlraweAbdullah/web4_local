import Link from "next/link"
import { useRouter } from "next/router";

const Header : React.FC = () => {
    const router = useRouter()
    return (
        <header className="p-3 mb-3 border bottom bg-dark bg-gradient">
            <p className="fs-2  mb-2 mb-lg-0 text-white">
                MyBookHub
            </p>
            <nav className="nav justify-content-center">
                <Link href="/" className={`link nav-link px-4 fs-5 ${router.pathname == "/"? "active":""}`}> Home</Link>
                <Link href="/books" className={`link nav-link px-4 fs-5 ${router.pathname == "/books"? "active":""}`}>Books</Link>
                <Link href="/books/add"  className={`link nav-link px-4 fs-5 ${router.pathname == "/books/add"? "active":""}`}>Add Book</Link>
                <Link href="/books/search"  className={`link nav-link px-4 fs-5 ${router.pathname == "/books/search"? "active":""}`}>Seach Book</Link>
                <Link href="/authors" className={`link nav-link px-4 fs-5 ${router.pathname == "/authors"? "active":""}`}>Authors</Link>                
                <Link href="/authors/add"  className={`link nav-link px-4 fs-5 ${router.pathname == "/authors/add"? "active":""}`}>Add Author</Link>
            </nav>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

        </header>
    )
} 

export default Header