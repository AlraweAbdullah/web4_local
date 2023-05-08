import { PrismaClient , Prisma} from '@prisma/client'

const database = new PrismaClient()


type AuthorPrisma = Prisma.AuthorGetPayload<{
}>

type BookPrisma = Prisma.BookGetPayload<{
    include: {author:{include: {country:true}}}
}>

type CountryPrisma = Prisma.CountryGetPayload<{

}>

type CategoryPrisma = Prisma.CategoryGetPayload<{
}>



export { database, AuthorPrisma, BookPrisma, CountryPrisma, CategoryPrisma}