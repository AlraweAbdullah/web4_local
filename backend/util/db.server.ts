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


type userPrisma = Prisma.UserGetPayload<{
}>



export { database, AuthorPrisma, BookPrisma, CountryPrisma, CategoryPrisma , Prisma, userPrisma}