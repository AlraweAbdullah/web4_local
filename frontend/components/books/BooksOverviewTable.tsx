import React from "react"
import { Book } from "../../types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPen,  faTrash, faInfo} from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"

type Props = {
    books: Array<Book>
}


const BooksOverviewTable: React.FC<Props> = ({ books }: Props) => {
    return (
        <>
                {books && (
                <>
                    <h4 className="text-center mb-4">Books Overview</h4>
                    <table className={`table table-hover`}>
                        <thead className="table table-dark thead">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">BookInfo</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books && books.map((book, index) => (
                                <tr key={index}>
                                    <td>{book.title}</td>
                                    <td><Link href={`/books/${book.id}`} className="btn btn-outline-info"><FontAwesomeIcon size="xs" icon={faInfo}/></Link></td>
                                    <td><Link href={`/books/${book.id}/delete`}  className="btn btn-outline-danger"><FontAwesomeIcon size="xs" icon={faTrash}/></Link></td>
                                    <td><Link href={`/books/${book.id}/update`} className="btn btn-outline-primary"><FontAwesomeIcon size="xs" icon={faPen}/></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </>
                )}
        </>
    )
}

export default BooksOverviewTable