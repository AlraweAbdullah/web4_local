import { database } from "../../util/db.server";
import { mapToCountry, mapToCountries} from "../../mapper/country.mapper";
import { Country } from "../model/country";


const getCountryById = async ({id}: {id:number}) : Promise<Country> =>{
    const country = await database.country.findUnique({
        where :{id: id}
    })

    if(!country){
        throw new Error("Country id couldn't be found")
    }

    return mapToCountry(country)
}

const getAllCountries = async () : Promise<Country[]> =>{
    const country = await database.country.findMany({
        orderBy:{
            id:"asc"
        }
    })

    return mapToCountries(country)
}

const updateCountry = async ({id, name}:{id:number, name:string}) : Promise<Country> =>{
    await getCountryById({id:id}) // Check if country exists by id 
    const country = await database.country.update({
        where: {
            id: id
        },
        data: {
            name: name
        },
})
    return mapToCountry(country)
}

export default {
    getCountryById,
    getAllCountries,
    updateCountry,
}
