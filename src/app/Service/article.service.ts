import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs"
import { ArticleDto } from "../Interface/article.interface";
import { TokenService } from "./token.service";

@Injectable()
export class ArticleService{
    Url ='https://k-konsult-server.online:80/K-Konsult/Article'
    constructor (private httpClient: HttpClient , 
                 private tokenService: TokenService
    ){    }

    article = new BehaviorSubject<ArticleDto[]>([])
    public articles$ = this.article;

    get articles(): ArticleDto[]{
        return this.article.getValue()
    }

    set articles(val : ArticleDto[]){
        this.article.next(val)
    }

    createArticle(article : ArticleDto): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.post<{message: string}>(`${this.Url}/CreateArticle` , article , {headers});
    }

    getAllArticle(): Observable<ArticleDto[]>{
        return this.httpClient.get<ArticleDto[]>(`${this.Url}/Get/AllArticle`)
    }

    getArticleByTitle(title: string): Observable<ArticleDto>{
        return this.httpClient.get<ArticleDto>(`${this.Url}/Get/ArticleTitle/title=${title}` , );
    }

    deleteArticle(title: string): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.delete<{message: string}>(`${this.Url}/Delete/title=${title}` , {headers});
    }

    updateArticle(article : ArticleDto): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.put<{message: string}>(`${this.Url}/UpdateArticle` , article , {headers})
    }

}