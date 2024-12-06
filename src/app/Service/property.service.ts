import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs"
import { PropertyDto } from "../Interface/property.interface";
import { PropertyInfoDto } from "../Interface/propertyinformation.interface";
import { TokenService } from "./token.service";

@Injectable()
export class PropertyService{
    Url ='https://k-konsult-server.online:80/K-Konsult/Property'
    UrlFile = 'https://k-konsult-server.online:80/K-Konsult/file'
    constructor (private httpClient: HttpClient , 
        private tokenService: TokenService
    ){    }
    property = new BehaviorSubject<PropertyDto[]>([])
    public properties$ = this.property;

    get properties(): PropertyDto[]{
        return this.property.getValue();
    }

    set properties(val : PropertyDto[]){
        this.property.next(val);
    }

    createProperty(newProperty: PropertyDto): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.post<{message: string}>(`${this.Url}/CreateProperty` , newProperty ,  {headers} )
    }
    getAllProperty(): Observable<string[]>{
        return this.httpClient.get<string[]>(`${this.Url}/Get/AllProperty`);
    }
    getProperties(): Observable<PropertyInfoDto[]>{
        return this.httpClient.get<PropertyInfoDto[]>(`${this.Url}/Get/Properties`);
    }
    getGetPropertyByName(propertyName: string): Observable<PropertyDto>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.post<PropertyDto>(`${this.Url}/GetPropertyByName` , propertyName ,  {headers});
    }

    getGetPropertyInformationByName(propertyName: string): Observable<PropertyInfoDto>{
        return this.httpClient.post<PropertyInfoDto>(`${this.Url}/Get/PropertyInformationByName` , propertyName);
    }

    deleteProperty(propertyName: string): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.delete<{message: string}>(`${this.Url}/Delete/property=${propertyName}`  ,  {headers});
    }
    getListofImages(type : string , propertyName: string ): Observable<string[]>{
        return this.httpClient.get<string[]>(`${this.UrlFile}/Get/files/${type}/${propertyName}`);
    }

    deleteImage(type : string ,propertyName: string  ,  fileName: string): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.delete<{message: string}>(`${this.UrlFile}/images/${type}/${propertyName}/${fileName}` , {headers});
    }

    deleteFolder(type : string , propertyName: string ): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.delete<{message: string}>(`${this.UrlFile}/delete-directory/${type}/${propertyName}` ,  {headers});
    }
    getPropertiesByType(type : string): Observable<PropertyInfoDto[]>{
        return this.httpClient.get<PropertyInfoDto[]>(`${this.Url}/Get/PropertiesByType/type=${type}`);
    }

    getPropertiesByTypeAndCategory(type : string , category : string): Observable<PropertyInfoDto[]>{
        return this.httpClient.get<PropertyInfoDto[]>(`${this.Url}/Get/PropertiesByTypeAndCategory/type=${type}&category=${category}`);
    }

    getPropertiesByCategory(category : string): Observable<PropertyInfoDto[]>{
        return this.httpClient.get<PropertyInfoDto[]>(`${this.Url}/Get/PropertiesByCategory/category=${category}`);
    }

    updateProperty(propertyDto: PropertyDto): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.put<{message: string}>(`${this.Url}/Update` , propertyDto ,  {headers});
    }

    getPropertyByAd(ad: string): Observable<PropertyInfoDto[]>{
        return this.httpClient.get<PropertyDto[]>(`${this.Url}/Get/PropertiesByAd/ad=${ad}`);
    }
}