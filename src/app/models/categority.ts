import { Player } from "./player"
import { Staff } from "./staff";

export interface Categority {
    idCategority:number;
    nameCategority:string;
    playerList: Player[];
    technicalStaff: Staff[];
}
