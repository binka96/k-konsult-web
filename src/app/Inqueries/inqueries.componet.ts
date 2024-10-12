import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import {MegaMenuModule} from 'primeng/megamenu';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InquiryDto } from '../Interface/inquiry.interface';
import { InquiryService } from '../Service/inquiry.service';
import { response } from 'express';
import { InquiriesDto } from '../Interface/inquiries.interface';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from '../Service/token.service';
import { TokenInterceptor } from '../Service/token-interceptor.service';


@Component({
  selector: 'inquiers-root',
  standalone: true,
  imports: [RouterOutlet ,
            RouterLink,
            RouterLinkActive,
            DataViewModule ,
            TagModule,
            CommonModule,
            ButtonModule , 
            CardModule ,
            ToastModule
            ],
  providers: [MessageService , InquiryService  ,
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor]  , 
  templateUrl: './inqueries.componet.html',
  styleUrl: './inqueries.componet.scss' ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Inqueries implements OnInit {
  title = 'Inqueries';
  constructor(private messageService: MessageService ,
              private inqueryService : InquiryService ) {}
  inquies: InquiriesDto [] = [];
  ngOnInit() {
    this.getAllInquery();
  }

  getAllInquery(){
    this.inqueryService.getAllInquery().subscribe({
      next: (response)=>{
        this.inquies = response
      }
    });
  }

  deleteInquiry(inquiry_id: number){
    this.inqueryService.deleteInquery(inquiry_id).subscribe({
      next: (response)=>
      {
        this.messageService.add(
          {
            severity: 'info',
            summary: response.message
          });
          this.getAllInquery()
      }
    });
  }

}
