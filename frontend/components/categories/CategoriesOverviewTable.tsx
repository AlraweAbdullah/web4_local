import React from "react"

import { Category } from "../../types"


type Props = {
    categories: Array<Category>
}


const CategoriesOverviewTable: React.FC<Props> = ({ categories }: Props) => {
   return (
        <>
                {categories && (
                <>
                    <h4 className="text-center mb-4">Categories Overview</h4>
                    <table className={`table table-hover`}>
                        <thead className="table table-dark thead">
                        <tr>
                           <th scope="col">Id</th>
                           <th scope="col">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                            {categories && categories.map((category, index)=>(
                           <tr key={index}>
                               <td>{category.id}</td>
                               <td>{category.name}</td>
                           </tr>
                            ))}
                        </tbody>
                    </table>
                    </>
                )}
        </>
    )
}

export default CategoriesOverviewTable


