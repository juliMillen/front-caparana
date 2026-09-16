import { Photo } from "./photo"

export interface Gallery {
    idGallery:number
    title:string
    publicationDate:string
    photosDTO: Photo[];
}
