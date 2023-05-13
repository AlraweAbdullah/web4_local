import React from "react"
import { Book } from "../../types"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import styles from "../../styles/Book.module.css"

type Props = {
    book
}


const BookOverview : React.FC<Props> = ({ book }: Props) => {
    return (
        <div className="col-6">

            {book && (
                    <>
                    <h4 className="text-center mb-4">Book {book.id} info</h4>
                    <table className="table table-hover table-bordered">
                    <thead className={`table table-dark ${styles.thead}`}>
                        <tr>
                            <th>Attribute</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="fw-bold" scope="col">Title</td>
                            <td>
                                {book.title}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold"  scope="col">Author</td>
                            <td>
                                {book.author.name}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold" scope="col">Pages</td>
                            <td>
                                {book.pages}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold" scope="col">Categories</td>
                            <td>
                                <ul >
                                    {book.categories && book.categories.map((category, index) => (
                                            <li key={index}>{category.name}</li>
                                    ))}
                                </ul>

                            </td>

                        </tr>

                        
                    </tbody>
                    </table>
             
                        
                
            <Link href="/books" className="btn btn-outline-primary">
                    <FontAwesomeIcon  size="xs" icon={faArrowLeft}/> Books
            </Link>
                    </>
            )}
        </div>
    )
}

export default BookOverview