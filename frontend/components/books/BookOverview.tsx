import React from "react"
import { Book } from "../../types"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo, faArrowLeft} from "@fortawesome/free-solid-svg-icons"


type Props = {
    book : Book
}


const BookOverview : React.FC<Props> = ({ book }: Props) => {
    return (
        <div className="col-6">
            {book && (
                <>
                    <h4 className="text-center mb-4">{book.title}</h4>
                    <div>
                        <b>Author : {book.author.name} </b> 
                        
                        <Link href={`/authors/${book.author.id}`} className="btn btn-outline-primary">
                            <FontAwesomeIcon size="xs" icon={faCircleInfo}/>
                        </Link> 
                    </div>
                    <div><b>Pages : {book.pages}</b></div>
                    <div>
                        <b>Categories : 
                        <ol>

                        {
                        book._categories.map((category, index) => (
                                <li key={index}>{category.name}</li>
                            ))
                        }
                        </ol>
                        
                        </b>
                    </div>
                    <Link href="/books">
                        <FontAwesomeIcon size="xs" icon={faArrowLeft}/> books
                    </Link>
                </>
                
            )}
        </div>
    )
}

export default BookOverview