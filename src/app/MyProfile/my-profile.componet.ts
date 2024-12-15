import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
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
import { UserDto } from '../Interface/user.interface';
import { UserService } from '../Service/user.service';
import { UserPasswordDto } from '../Interface/userPasswordChange.interface';
import { response } from 'express';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TokenService } from '../Service/token.service';
import { TokenInterceptor } from '../Service/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'inquiers-root-my-profile',
  standalone: true,
  imports: [RouterOutlet , 
            MenubarModule ,
            MegaMenuModule , 
            FileUploadModule , 
            ToastModule , 
            CommonModule , 
            TabViewModule,
            InputTextModule , 
            FormsModule , 
            PasswordModule,
            ButtonModule ,
            ToastModule ,
            DividerModule , 
            DialogModule , 
            ],
  providers: [MessageService , UserService ,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor]  , 
  templateUrl: './my-profile.componet.html',
  styleUrl: './my-profile.componet.scss' ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyProfile implements OnInit {
  title = 'MyProfile';
  username: string  = "";
  name: string = "";
  lastname: string = "";
  password: string | undefined;
  password_old: string | undefined;
  password_new: string | undefined;
  password_new2: string | undefined;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  dialogDeleteAcount: boolean = false;
  userDto: UserDto = {
    username : "" , password: "" 
  };
  userPassword : UserPasswordDto = {
    new_password : "" , 
    userDto: {
      username : "", password: ""
    }
  }
  constructor(private messageService: MessageService , 
              private userService: UserService,
              private router: Router,
              private deviceService: DeviceDetectorService
  ) {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();
  }

  ngOnInit() {
    
 }



  changePassword(){
    if(this.password_new!== undefined && this.password_new2!==undefined && this.username!==undefined && this.password_old!==undefined){
      if(this.password_new===this.password_new2){
        this.userDto.username = this.username;
        this.userDto.password = this.password_old;
        this.userPassword.userDto = this.userDto;
        this.userPassword.new_password = this.password_new;
        this.userService.changePassword(this.userPassword).subscribe(
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
        )
      }else{
        this.messageService.add(
          {
            severity: 'error',
            summary: "Новите пароли не са еднакви!"
          }
        );
      }
    }else{
      this.messageService.add(
        {
          severity: 'error',
          summary: "Полетата не са попълнени!"
        }
      );
    }
  }


  showDeleteDialog() {
    const currentUsername = localStorage.getItem('currentUsername');
    this.dialogDeleteAcount = true;
    if(currentUsername !== null && currentUsername !== undefined){
      this.username = currentUsername;
    }
  }

  deleteMyAcount(){
    if(this.username!==undefined && this.password!==undefined){
      this.userDto.username = this.username;
      this.userDto.password = this.password;
      this.userService.deleteAcount(this.userDto).subscribe(
        {
          next: (response)=>{
            this.messageService.add(
              {
                severity: 'info',
                summary: response.message
              }
            );
            if(response.message === "Потребителя е изтрит!"){
              localStorage.removeItem('currentUsername');
            setTimeout(() => {
              this.router.navigate(['/Log']);
            }, 1000);
          }
          }
          
        }
      )
    }
    else{
      this.messageService.add(
        {
          severity: 'error',
          summary: "Въведете парола!"
        }
      );
    }
  }

}
