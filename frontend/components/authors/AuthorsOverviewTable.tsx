import React from "react"
import { Author } from "../../types"




type Props = {
    authors: Array<Author>
}


const AuthorsOverviewTable: React.FC<Props> = ({ authors }: Props) => {
   return (
        <>
                {authors && (
                <>
                    <h4 className="text-center mb-4">Authors Overview</h4>
                    <table className={`table table-hover`}>
                        <thead className="table table-dark thead">
                        <tr>
                           <th scope="col">Id</th>
                           <th scope="col">Name</th>
                           <th scope="col">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors && authors.map((author, index)=>(
                           <tr key={index}>
                               <td>{author.id}</td>
                               <td>{author.name}</td>
                               <td>{author.country.name}</td>
                           </tr>
                            ))}
                        </tbody>
                    </table>
                    </>
                )}
        </>
    )
}

export default AuthorsOverviewTable


