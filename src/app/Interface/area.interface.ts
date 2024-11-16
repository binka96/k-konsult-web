import { TownshipDto } from "./township.interface";

export interface AreaDto{
    Cname: string;
    townships: TownshipDto[];
}