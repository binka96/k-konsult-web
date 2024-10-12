import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import {MegaMenuModule} from 'primeng/megamenu';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CreateUserDto } from '../Interface/create-user.interface';
import { UserService } from '../Service/user.service';
import { response } from 'express';
import { TokenInterceptor } from '../Service/token-interceptor.service';
import { TokenService } from '../Service/token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@Component({
  selector: 'registration-root',
  standalone: true,
  imports: [RouterOutlet , 
            MenubarModule ,
            MegaMenuModule , 
            FileUploadModule , 
            ToastModule , 
            CommonModule , 
            TabViewModule , 
            InputTextModule , 
            FormsModule , 
            PasswordModule,
            ButtonModule ,
            ToastModule
            ],
  providers: [MessageService , UserService , 
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor
  ] , 
  templateUrl: './registration.componet.html',
  styleUrl: './registration.componet.scss' ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Registration implements OnInit {
  title = 'Registration';
  constructor(private messageService: MessageService , private userService: UserService) {}
  username: string | undefined;
  password1: string | undefined;
  password2: string | undefined;
  name: string | undefined;
  lastname: string | undefined;
  newUser : CreateUserDto = {
    username : "" , password: "", name: "" , lastName: ""
  }
  ngOnInit() {

  }

  createUser(){
    if(this.username!==undefined && this.password1!==undefined && this.password2!==undefined
       && this.name!==undefined && this.lastname!==undefined ){
        if(this.password1===this.password2){
          this.newUser.username = this.username;
          this.newUser.password = this.password1;
          this.newUser.name = this.name;
          this.newUser.lastName = this.lastname;
          this.userService.createUser(this.newUser).subscribe(
            {
              next: (response)=>{
                this.messageService.add(
                  {
                    severity: 'info',
                    summary: response.message
                  }
                );
              }
            }
          );
        }
        else{
          this.messageService.add(
            {
              severity: 'error',
              summary: "Новите пароли не са еднакви!"
            }
          );
        }
       }
       else{
        this.messageService.add(
          {
            severity: 'error',
            summary: "Полетата не са попълнени!"
          }
        );
       }
  }

}
