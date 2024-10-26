import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { InquiryDto } from '../Interface/inquiry.interface';
import { InquiryService } from '../Service/inquiry.service';
import { response } from 'express';
import { ToastModule } from 'primeng/toast';
import { TokenInterceptor } from '../Service/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from '../Service/token.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-root-inquery',
  standalone: true,
  imports: [RouterOutlet ,
            RouterLink,
            RouterLinkActive  ,
            ButtonModule,
            FormsModule , 
            ToastModule,
            InputTextModule ,
            CommonModule,
           
  ],
  providers: [MessageService , InquiryService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor
  ] ,
  templateUrl: './inquery.component.html',
  styleUrl: './inquery.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Inquery implements OnInit{

  title = 'k-konsult-web-inquery';
  firstName : string | undefined;
  lastName : string | undefined;
  email : string | undefined;
  phone : string | undefined;
  comment: string | undefined;
  date:  Date = new Date()
  new_inquiry: InquiryDto  = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    comment: '',
    date: "",
    time:"",
    jdprConferm: false
  }  ;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  constructor(private messageService: MessageService , 
              private inqueryService : InquiryService ,
              private deviceService: DeviceDetectorService
) {
  this.isMobile = this.deviceService.isMobile();
  this.isTablet = this.deviceService.isTablet();
  this.isDesktop = this.deviceService.isDesktop();
}
  ngOnInit(){
  }
  
  createInquery(){

    if(this.firstName!== undefined && this.lastName !== undefined && this.email !==undefined && this.phone!== undefined && this.comment !== undefined){
      this.new_inquiry.name = this.firstName;
      this.new_inquiry.lastName = this.lastName;
      this.new_inquiry.email = this.email;
      this.new_inquiry.phone = this.phone;
      this.new_inquiry.comment = this.comment;
      this.new_inquiry.jdprConferm = true;
      if(this.date.getDate() > 9 && (this.date.getMonth()+1)> 9){
        this.new_inquiry.date = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDate();
      } else if(this.date.getDate() < 9 && (this.date.getMonth()+1) < 9){
        this.new_inquiry.date = this.date.getFullYear()+"-0"+(this.date.getMonth()+1)+"-0"+this.date.getDate();
      }else if( this.date.getDate() > 9 && (this.date.getMonth()+1) < 9){
        this.new_inquiry.date = this.date.getFullYear()+"-0"+(this.date.getMonth()+1)+"-"+this.date.getDate();

      }else if( this.date.getDate() < 9 && (this.date.getMonth()+1) > 9){
        this.new_inquiry.date = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-0"+this.date.getDate();

      }
      this.new_inquiry.time = this.date.getHours()+":"+this.date.getMinutes()+":00"
      this.inqueryService.createInquery(this.new_inquiry).subscribe({
        next: (response)=>{
          this.messageService.add({
            severity: 'info',
            summary: response.message
          })
        }
      });
    }
    else{
      this.messageService.add({
        severity: 'error',
        summary: "Полетата не са попълнени!"
      })
    }
  }
}

