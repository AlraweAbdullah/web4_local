import { Country } from "./country"
export class Author {
    readonly id: number;
    readonly name: string;
    readonly country: Country;
    
    
    constructor (author : {id:number, name:string,  country:Country}){
        this.id  =  author.id;
        this.name = author.name;
        this.country = author.country;
    }

    static create(id:number, name:string, country:Country){
        return new Author( {id:id, name:name, country:country})
    }
}