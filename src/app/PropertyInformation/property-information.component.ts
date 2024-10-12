import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import { PropertyService } from '../Service/property.service';
import { PropertyDto } from '../Interface/property.interface';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InquiryDto } from '../Interface/inquiry.interface';
import { InquiryService } from '../Service/inquiry.service';
import { ToastModule } from 'primeng/toast';
import { PropertyInfoDto } from '../Interface/propertyinformation.interface';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../Service/token-interceptor.service';
import { TokenService } from '../Service/token.service';
@Component({
  selector: 'app-root-property-information',
  standalone: true,
  imports: [RouterOutlet , 
            RouterLink,
            RouterLinkActive  ,
            ButtonModule,
            GalleriaModule , 
            FormsModule , 
            DividerModule , 
            DialogModule ,
            InputTextModule ,
            ToastModule  ],
            
  providers: [ PropertyService , InquiryService, MessageService  , 
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor
  ],
  templateUrl: './property-information.component.html',
  styleUrl: './property-information.component.scss'
})
export class PropertyInformation implements OnInit{

  title = 'k-konsult-web-property';
  property: PropertyInfoDto = {
    nameProperty: '',
    type: '',
    town: '',
    neighborhood: '',
    category: '',
    price: 0,
    pricePerQuadrature: 0,
    quadrature: 0,
    construction: '',
    typeOfConstruction: '',
    akt: '',
    description: '',
    yearOfConstruction: 0,
    floar: 0,
    floars: 0,
    elevator: false,
  };
  images: any[] = [];
  firstName : string | undefined;
  lastName : string | undefined;
  email : string | undefined;
  phone : string | undefined;
  comment: string | undefined;
  dialogMakeInquiry: boolean = false;
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
  date: Date = new Date();
  constructor (private propertyService: PropertyService , 
               private route: ActivatedRoute , 
               private inqueryService : InquiryService , 
               private messageService: MessageService ){
  
  }
  ngOnInit(){
    const propertyName  = this.route.snapshot.paramMap.get('propertyName');
    if(propertyName!== undefined && propertyName!== null){
    this.property.nameProperty = propertyName.toString();
  }
  this.getPropertyInformation();
  }

  getPropertyInformation(){
    if(this.property.nameProperty !== undefined){
    this.propertyService.getGetPropertyInformationByName(this.property.nameProperty).subscribe(
      {
        next: (response)=>{
          this.property = response;
        }
      }
    );
    this.propertyService.getListofImages(this.property.nameProperty).subscribe({
      next: (response)=>{
        this.images = [];
        for (let i = 0; i < response.length; i++) {
          this.images.push({ 
             previewImageSrc: "http://localhost:8080/K-Konsult/file/Get/images/"+this.property.nameProperty+"/"+ response[i], 
             thumbnailImageSrc:  "http://localhost:8080/K-Konsult/file/Get/images/"+this.property.nameProperty+"/"+ response[i], 
             alt: "Description for Image "+i+", title: Title "+i
            }); 
         }
      }
    });
  
  }
  }
  displayModal: boolean = false;
openGalleryModal() {
  this.displayModal = true;
  // Можете да добавите и допълнителна логика, ако е необходимо.
}

openDialogInquery(){
  this.dialogMakeInquiry = true;
}

createInquery(){
    
  if(this.firstName!== undefined && this.lastName !== undefined && this.email !==undefined && this.phone!== undefined 
    && this.comment !== undefined && this.property.nameProperty !== undefined){
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
    this.inqueryService.createInqueryForProperty(this.new_inquiry , this.property.nameProperty ).subscribe({
      next: (response)=>{
        this.messageService.add({
          severity: 'info',
          summary: response.message
        })
        this.dialogMakeInquiry = true;
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

