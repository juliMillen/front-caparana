import { Photo } from "./photo"

export class Gallery {
    idGallery!:number
    title!:string
    publicationDate!:Date
    photosDTOS: Photo[] = []
}
