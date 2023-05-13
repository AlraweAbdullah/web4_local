import React from "react"

import { Author } from "../../types"

type Props = {
    author: Author
}


const AuthorOverview: React.FC<Props> = ({ author }: Props) => {
    return (
        <>
            <h4 className="text-center mb-4">Author</h4>
            <div className="col-6">
                    {author && (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{author.id}</td>
                                <td>{author.name}</td>
                                <td>{author.country}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default AuthorOverview