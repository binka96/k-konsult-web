import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InquiryService } from '../Service/inquiry.service';
import { InquiriesDto } from '../Interface/inquiries.interface';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from '../Service/token.service';
import { TokenInterceptor } from '../Service/token-interceptor.service';
import { PropertyDto } from '../Interface/property.interface';
import { PropertyService } from '../Service/property.service';
import { PropertyInfoDto } from '../Interface/propertyinformation.interface';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Meta, Title } from '@angular/platform-browser';


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
  providers: [MessageService , PropertyService  ,
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor]  , 
  templateUrl: './daria.component.html',
  styleUrl: './daria.component.scss' ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Daria implements OnInit {
  title = 'Daria Residence';

    constructor( private router: Router ,  
                private messageService: MessageService,
                private deviceService: DeviceDetectorService,
                private propertyService: PropertyService,
                private titles: Title, 
                private meta: Meta)
   {
     this.isMobile = this.deviceService.isMobile();
     this.isTablet = this.deviceService.isTablet();
     this.isDesktop = this.deviceService.isDesktop();
   }
  inquies: InquiriesDto [] = [];
  propertydto : PropertyDto | undefined;
  propertiesFilter: PropertyInfoDto[] = [];
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  async ngOnInit() {
    this.propertyForDaria();
    this.titles.setTitle('Daria Residence');
    this.setMetaTags();
  }

  propertyForDaria(){
    this.propertyService.getPropertyByAd("DARIA RESIDENCE").subscribe({
        next: (response)=>{
            this.propertiesFilter=response;
        }
    });
  }
 
  setMetaTags() {
    this.meta.addTag({
        name: 'keywords',
        content: 'DARIA RESIDANCE, жилищна сграда, имоти в София, апартаменти в София, ново строителство, имоти за продажба, имоти под наем, инвестиции в имоти'
    });
    this.meta.addTag({
        name: 'description',
        content: 'Открийте DARIA RESIDANCE – съвременна жилищна сграда в София, предлагаща луксозни апартаменти и уникални възможности за инвестиции. Свържете се с K-Konsult за повече информация.'
    });
}

}
