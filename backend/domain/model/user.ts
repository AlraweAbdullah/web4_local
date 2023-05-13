export class User {
    readonly id: number;
    readonly username: string;
    readonly password: string;
    
    
    constructor (user : {id:number, username:string,  passsord:string}){
        this.id  =  user.id;
        this.username = user.username;
        this.password = user.passsord;
    }

    static create(id:number, username:string, passsord:string){
        return new User( {id:id, username:username, passsord:passsord})
    }
}