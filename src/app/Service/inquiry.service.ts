import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs"
import { ArticleDto } from "../Interface/article.interface";
import { InquiryDto } from "../Interface/inquiry.interface";
import { InquiriesDto } from "../Interface/inquiries.interface";
import { TokenService } from "./token.service";

@Injectable()
export class InquiryService{
    Url ='https://k-konsult-server.online:80/K-Konsult/Inquiry'
    constructor (private httpClient: HttpClient , 
                 private tokenService: TokenService
    ){    }
    inquiry = new BehaviorSubject<InquiryDto[]>([])
    public inquiries$ = this.inquiry;

    get inquiries(): InquiryDto[]{
        return this.inquiry.getValue()
    }

    set inquiries(val : InquiryDto[]){
        this.inquiry.next(val);
    }

    createInquery(inquery: InquiryDto): Observable<{message: string}>{
        return this.httpClient.post<{message: string}>(`${this.Url}/Get/CreateInquiry` , inquery)
    }

    createInqueryForProperty(inquery: InquiryDto , id: number): Observable<{message: string}>{
        return this.httpClient.post<{message: string}>(`${this.Url}/Get/CreateInquiry/PropertyId=${id}` , inquery)
    }


    getAllInquery(): Observable<InquiriesDto[]>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.get<InquiriesDto[]>(`${this.Url}/GetAllInquiry` ,  {headers} )
    }

    deleteInquery(inquiry_id: number): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.delete<{message: string}>(`${this.Url}/DeleteInquiry/InquiryId=${inquiry_id}`,  {headers} );
    }
}