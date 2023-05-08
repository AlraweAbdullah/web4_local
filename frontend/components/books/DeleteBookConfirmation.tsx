import React from "react"
import { Book } from "../../types"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faTrash} from "@fortawesome/free-solid-svg-icons"
import BookService from "../../services/BookService"
import { useRouter } from "next/router"
type Props = {
    book : Book
}


const DeleteBook : React.FC<Props> = ({ book }: Props) => {
    const  router = useRouter()
    return (
        <div className="col-6">
            {book && (
                <>
                    <h4 className="text-center mb-4">Delete book with id : {book.id}</h4>
                    <p>Delete book with <b>title:</b> {book.title} for <b>author:</b> {book.author.name} ?</p>
                    <Link href="/books" className="btn btn-outline-primary px-4 fs-6">
                        <FontAwesomeIcon  size="xs" icon={faArrowLeft}/> back
                    </Link> <button  onClick={ async ()=> {
                        await BookService.deleteBookById({id:book.id})
                        router.push("/books")
                    }} className="btn btn-outline-danger px-4 fs-6">
                        <FontAwesomeIcon  size="xs" icon={faTrash}/> Yes
                    </button>
                </>
            )}
        </div>
    )
}



export default DeleteBook