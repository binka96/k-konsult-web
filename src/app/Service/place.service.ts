import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs"
import { TokenService } from "./token.service";
import { AreaDto } from "../Interface/area.interface";
import { NeighborhoodDto } from "../Interface/neighborhood.interface";
@Injectable()
export class PlaceService{
    Url ='http://192.168.236.130:8080/K-Konsult/Place'
    constructor (private httpClient: HttpClient , 
                 private tokenService: TokenService
    ){    }
    place = new BehaviorSubject<AreaDto[]>([])
    public places$ = this.place;

    get places(): AreaDto[]{
        return this.place.getValue()
    }

    set places(val : AreaDto[]){
        this.place.next(val)
    }

    neighborhood = new BehaviorSubject<NeighborhoodDto[]>([]);
    public neighborhoods$ = this.neighborhood;

    get neighborhoods(): NeighborhoodDto[]{
        return this.neighborhood.getValue()
    }

    set neighborhoods(val : NeighborhoodDto[]){
        this.neighborhood.next(val)
    }


    getAllPlaces(): Observable<AreaDto[]>{
        return this.httpClient.get<AreaDto[]>(`${this.Url}/getAllPlace`);
    }

    getAllPlacesWithoutArea(): Observable<AreaDto[]>{
        return this.httpClient.get<AreaDto[]>(`${this.Url}/getAllPlaceWithoutArea`);
    }

    getAllNeiberhood(id: number): Observable<NeighborhoodDto[]>
    {
        return this.httpClient.get<NeighborhoodDto[]>(`${this.Url}/Neighborhood/get/id=${id}`);
    }

}