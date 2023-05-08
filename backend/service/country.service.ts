import { Country } from "../domain/model/country"
import countryDB from "../domain/data-access/country.db"

const getAllCountries = async(): Promise<Country[]> => await countryDB.getAllCountries();


const getCountryById = async ({id}: {id: number}) : Promise<Country> => await countryDB.getCountryById({id:id})

const updateCountry = async ({id, name}: {id:number, name:string}) : Promise<Country> => await countryDB.updateCountry({id:id, name:name}) 


export default {
    getAllCountries,
    getCountryById,
    updateCountry
}