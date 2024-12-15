import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs"
import { TokenService } from "./token.service";
import { AreaDto } from "../Interface/area.interface";
import { NeighborhoodDto } from "../Interface/neighborhood.interface";
@Injectable()
export class PlaceService{
    Url ='https://k-konsult-server.online:80/K-Konsult/Place'
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
        return this.httpClient.get<AreaDto[]>(`${this.Url}/Get/getAllPlace`);
    }

    getAllPlacesWithoutArea(): Observable<AreaDto[]>{
        return this.httpClient.get<AreaDto[]>(`${this.Url}/Get/getAllPlaceWithoutArea`);
    }

    getAllNeiberhood(id: number): Observable<NeighborhoodDto[]>
    {
        return this.httpClient.get<NeighborhoodDto[]>(`${this.Url}/Get/Neighborhood/get/id=${id}`);
    }

    addNeiberhood(id: number, name: string): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.post<{message: string}>(`${this.Url}/Neighborhood/add/id=${id}` , name , {headers});
    }

    updateNeiberhood(id: number, new_name: string): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.post<{message: string}>(`${this.Url}/Neighborhood/Update/id=${id}` , new_name , {headers});
    }

    updateCity(id: number, name: string): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.post<{message: string}>(`${this.Url}/UpdatePlace/id=${id}` , name , {headers});
    }
}