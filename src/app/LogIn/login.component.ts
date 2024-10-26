import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../Service/user.service';
import { MessageService } from 'primeng/api';
import { UserDto } from '../Interface/user.interface';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from '../app.component';
import { TokenService } from '../Service/token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../Service/token-interceptor.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'login-root',
  standalone: true,
  imports: [RouterOutlet , 
        InputTextModule , 
        FormsModule , 
        PasswordModule,
        ButtonModule ,
        RouterModule,
        MessagesModule,
        CommonModule,
        ToastModule
  ],
  providers: [MessageService ,UserService ,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LogIn {
  title = 'LogIn';
  username: string | undefined;
  password: string | undefined;
  user: UserDto = {
    username : "" , password: "" 
  };
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  constructor(private userService: UserService , 
              private messageService: MessageService , 
              private router: Router ,
              private appComponent: AppComponent ,
              private tokenService: TokenService,
              private deviceService: DeviceDetectorService){
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();
  }
  ngOnInit(){
    
  }

  login(){
    //const currentUsername = localStorage.getItem('currentUsername');
    if(this.username!==undefined && this.password!== undefined){
      this.user.username = this.username;
      this.user.password = this.password;

      this.userService.LogginUser(this.user).subscribe(
      {
        next: (response)=>{
          this.messageService.add(
            {
              severity: 'info',
              summary: response.message
            }
          );
          if(response.message === "Успеш вход!"){
            this.tokenService.setToken(response.token);
            this.appComponent.access = response.access;
            localStorage.setItem('currentUsername', this.user.username);
            this.setAppComponetMenu();
          setTimeout(() => {
            this.router.navigate(['/Property']);
          }, 1000);
        }
        }
      }
      );
    }
    else{
      this.messageService.add(
        {
          severity: 'error',
          summary: "Полетата не са попълнени!"
        });
    }
  }


  setAppComponetMenu(){
    this.appComponent.items = [
      { icon: "pi pi-home",styleClass: "custom-icon-color" , routerLink:"/"},
      { label: "Имоти" ,  routerLink: "/Properties/all" , 
        items: [{label: "Продажби" , routerLink: "/Properties/Продажби" ,  items:[
          {label: "Едностаен" , routerLink: "/Properties/Продажби/Едностаен"},
          {label: "Двустаен" , routerLink: "/Properties/Продажби/Двустаен"},
          {label: "Тристаен" , routerLink: "/Properties/Продажби/Тристаен"},
          {label: "Магазин" , routerLink: "/Properties/Продажби/Магазин"},
          {label: "Къща" , routerLink: "/Properties/Продажби/Къща"},
          {label: "Офис" , routerLink: "/Properties/Продажби/Офис"},
          {label: "Гараж" , routerLink: "/Properties/Продажби/Гараж"},
        ]} , 
        {label: "Наеми" , routerLink: "/Properties/Наеми", items:[
          {label: "Едностаен" , routerLink: "/Properties/Наеми/Едностаен"},
          {label: "Двустаен" , routerLink: "/Properties/Наеми/Двустаен"},
          {label: "Тристаен" , routerLink: "/Properties/Наеми/Тристаен"},
          {label: "Магазин" , routerLink: "/Properties/Наеми/Магазин"},
          {label: "Къща" , routerLink: "/Properties/Наеми/Къща"},
          {label: "Офис" , routerLink: "/Properties/Наеми/Офис"},
          {label: "Гараж" , routerLink: "/Properties/Наеми/Гараж"},
        ]}]
      },
      { label: 'Запитвания', routerLink: "/Inquery" },
      { label: "Блог"  , routerLink: "/Blog"},
      { label: "За нас"  , routerLink: "/Contact"},
      { label: "Партниьори" ,routerLink: "/Partners"},
      { label: "Управлениие",
        items: [
          { label: 'Имоти', routerLink: "/Property" },
          { label: 'Завки',  routerLink: "/Inqueries"},
          { label: "Статия" ,routerLink: "/Article"},
          { label: 'Добави потребител', routerLink: "/Registration" },
          { label: 'Моят профил', routerLink: "/MyProfile" },
        ]
      }
    ]
  }
}
