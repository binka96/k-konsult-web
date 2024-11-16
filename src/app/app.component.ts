import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import {MenuItem, MessageService} from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TokenService } from './Service/token.service';
import { UserService } from './Service/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './Service/token-interceptor.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import {SlideMenuModule} from 'primeng/slidemenu';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,
            RouterLink,
            RouterLinkActive,
            MenubarModule ,
            MegaMenuModule ,
            ButtonModule ,
            CommonModule,
            RippleModule ,
            SlideMenuModule,
            ToastModule
  ],
  providers: [MessageService , UserService ,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit{
  items: MenuItem[] | undefined;
  title = 'k-konsult-web';
  typeProperties: string = "cat";
  username: string = "ВХОД";
  access: string  = "";
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  constructor( private router: Router ,  
               private messageService: MessageService,
               private tokenService: TokenService ,
               private userService: UserService  , 
               private deviceService: DeviceDetectorService)
  {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();
  }
  ngOnInit(){
    if (typeof window !== 'undefined') {
      this.sesstion();
      this.items = [
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
          ]} , {label: "Наеми" , routerLink: "/Properties/Наеми", items:[
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
        { label: "Партньори" ,routerLink: "/Partners"}
      ];
  }
    }


  reloadApplication() {
     window.location.reload();
  }

  loggin(){
    this.items = [
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
      { label: "Партньори" ,routerLink: "/Partners"},
      { label: "Управлениие",
        items: [
          { label: 'Имоти', routerLink: "/Property" },
          { label: 'Завки',  routerLink: "/Inqueries"},
          { label: "Статия" ,routerLink: "/Article"},
          { label: 'Добави потребител', routerLink: "/Registration" },
          { label: 'Моят профил', routerLink: "/MyProfile" },
          { label: 'Изход' ,  command: () => {
            this.logginOut();},
            routerLink: "/"  }
        ]
      }
    ]
  }
  logginOut(){
    this.tokenService.clearToken();
    localStorage.removeItem('currentUsername');
    this.username = "ВХОД";
    this.items = [
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
        ]} , {label: "Наеми" , routerLink: "/Properties/Наеми", items:[
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
      { label: "Партньори" ,routerLink: "/Partners"}
    ];
  }
  sesstion(){
    if(localStorage.getItem('currentUsername')!== undefined){
    const currentUsername = localStorage.getItem('currentUsername');
    if(this.tokenService.getToken()!==undefined && this.tokenService.getToken()!== null&&currentUsername!==null){
    this.userService.sessionRequest(currentUsername.toString()).subscribe({
      next: (response)=>{
        this.access = response.Access
        this.username = response.Username;
        if(this.username!==null && this.username!==undefined && this.username!==""){
        this.username = currentUsername;
        this.loggin() ;
        this.router.navigate(['/']);
        }else{
          this.logginOut();
          this.messageService.add({
            severity: 'error',
            summary: "Сесията е изтекла , логнете се отново!",
            
         });
         this.router.navigate(['/']);
        }
      },
      error: (error) =>{
        console.error('Error retrieving greeting:', error);
        this.messageService.add({
          severity: 'error',
          summary: "Сесията е изтекла , логнете се отново!",
          
       });
      }
    });
  }}}
}

