import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserDto } from "../Interface/user.interface";
import { response } from "express";
import { UserPasswordDto } from "../Interface/userPasswordChange.interface";
import { CreateUserDto } from "../Interface/create-user.interface";
import { TokenService } from "./token.service";
//import { TokenService } from "./token.service";

@Injectable()
export class UserService{
    Url ='http://192.168.182.130:8080/K-Konsult/User'
    constructor (private httpClient: HttpClient , 
                 private tokenService: TokenService
    ){    }
    user = new BehaviorSubject<UserDto[]>([]);
    public users$ = this.user;

    userPassword  = new BehaviorSubject<UserPasswordDto[]>([]);
    public userPasswords$ = this.userPassword;

    createUserDto = new BehaviorSubject<CreateUserDto[]>([]);
    public createUserDtos$ = this.createUserDto;

    get users(): UserDto[]{
        return this.user.getValue();
    }

    set users(val: UserDto[]){
        this.user.next(val);
    }

    get userPasswords(): UserPasswordDto[]{
        return this.userPassword.getValue();
    }

    set userPasswords(val : UserPasswordDto[]){
        this.userPassword.next(val);
    }

    get createUserDtos(): CreateUserDto[]{
        return this.createUserDto.getValue();
    }

    set createUserDtos(val: CreateUserDto[]){
        this.createUserDto.next(val);
    }

    LogginUser(user: UserDto): Observable<{token: string , message: string , access: string }> {
        return this.httpClient.post<{ token: string , message: string , access: string }>(`${this.Url}/LogIn` , user);
    }

    changePassword(userPasswordDto: UserPasswordDto): Observable<{message: string }>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.put<{ message: string }>(`${this.Url}/UpdatePassword` , userPasswordDto , {headers});
    }

    createUser(newUserDto : CreateUserDto): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.post<{ message: string }>(`${this.Url}/CreateUser` , newUserDto ,  {headers});
    }

    deleteAcount(user: UserDto): Observable<{message: string}>{
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.post<{ message: string }>(`${this.Url}/DeletMyAcount` , user ,  {headers});
    }

    sessionRequest(username: string ): Observable<{Username: string , Access: string }> {
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.httpClient.post<{Username: string , Access: string }>(`${this.Url}/LogRequest` , username,{headers});
    }
}   