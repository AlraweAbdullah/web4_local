import { Author } from "../domain/model/author";
import { AuthorPrisma, BookPrisma, CountryPrisma } from "../util/db.server";
import { mapToCountry } from "./country.mapper"


const mapToAuthor =({
    id,
    name,
    country
}: AuthorPrisma &  {country: CountryPrisma}):
Author => Author.create(id, name, mapToCountry(country) )


const mapToAuthors = (authorPrisma: AuthorPrisma[]): Author[]  =>
authorPrisma.map(mapToAuthor)

export {mapToAuthor, mapToAuthors}
