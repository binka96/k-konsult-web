import { NeighborhoodDto } from "./neighborhood.interface";
import { PlaceDto } from "./place.interface";

export interface PropertyInfoDto {
    nameProperty: string,
    type: string,
    place: PlaceDto,
    neighborhood: NeighborhoodDto,
    category: string,
    price: number,
    pricePerQuadrature: number,
    quadrature: number,
    construction: string,
    typeOfConstruction: string,
    akt: string,
    description: string,
    yearOfConstruction: number,
    floar: number,
    floars: number,
    ad: string;
    }