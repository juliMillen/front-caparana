import { Categority } from "./categority"

export interface Player {
    idPlayer:number
    name:string
    surname:string
    position:string
    num:number
    urlImage:string
    categority?: Categority[];
}
