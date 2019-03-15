
import {UsuarioInterface} from './UsuarioInterface';

export class UsuarioClass implements UsuarioInterface {
    id: number;
    name: string;
    username: string;
    email: string;
    
    constructor(nombre:string,usuario:string,email:string){
        this.id=Math.floor(Math.random()*1000)
        this.name=nombre;
        this.username=usuario;
        this.email=email;
    }
}