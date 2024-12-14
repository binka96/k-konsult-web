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
import { DeviceDetectorService } from 'ngx-device-detector';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Meta, Title } from '@angular/platform-browser';
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
            ToastModule ,
            ScrollPanelModule,
            InputTextareaModule ],
            
  providers: [ PropertyService , InquiryService, MessageService  , 
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor
  ],
  templateUrl: './property-information.component.html',
  styleUrl: './property-information.component.scss'
})
export class PropertyInformation implements OnInit{

    property: PropertyInfoDto = {
    propertyId: 0 ,
    nameProperty: '',
    type: '',
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
    ad: '',
    place: {
      id: 0,
      name: ''
    },
    neighborhood: {
      id: 0,
      name: 'Няма квартал'
    }
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

  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  constructor(private propertyService: PropertyService , 
    private route: ActivatedRoute , 
    private inqueryService : InquiryService , 
    private messageService: MessageService,
              private deviceService: DeviceDetectorService ,
              private title: Title, 
              private meta: Meta)  {

              this.isMobile = this.deviceService.isMobile();
              this.isTablet = this.deviceService.isTablet();
              this.isDesktop = this.deviceService.isDesktop();
              }


propertyid: number | null = null;

  ngOnInit(){

    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('property="og:url"');
    this.meta.removeTag('property="og:type"');
    this.meta.removeTag('name="twitter:description"');

    this.route.params.subscribe(params => {
      this.propertyid = Number(params['propertyName']);
    if (this.propertyid) {
      // Load the property information based on the parameter
      this.meta.addTag({ property: 'og:description', content: `Избери своя имот днес.` });
      this.meta.addTag({ property: 'og:image', content: `https://k-konsult-server.online:80/K-Konsult/file/Get/images/property/${this.propertyid.toString()}/image1.png` });
      this.meta.addTag({ property: 'og:url', content: `https://k-konsult.bg/PropertyInformation/${this.propertyid.toString()}` });
      this.meta.addTag({ property: 'og:type', content: 'website' });
      this.meta.addTag({ name: 'twitter:description', content: `https://k-konsult-server.online:80/K-Konsult/file/Get/images/property/${this.propertyid.toString()}/image1.png` });
      this.meta.addTag({ property: 'og:description', content: `Избери своя имот днес.` });
      this.loadPropertyInformation(this.propertyid);

    } else {
      // Handle the case when there's no property name
      this.loadDefaultPropertyInformation();
    }
  });
  }


  loadPropertyInformation(propertyid: number) {

    if(propertyid!== undefined && propertyid!== null){
      this.property.propertyId = propertyid;
      this.getPropertyInformation();
      
      
    }

  }

  loadDefaultPropertyInformation() {
    
    // Logic to load default or general property information
  }

  getPropertyInformation(){
    if(this.property.propertyId !== undefined && this.property.propertyId !== null){
    this.propertyService.getGetPropertyInformationById(this.property.propertyId).subscribe(
      {
        next: (response)=>{
          this.property = response;
          this.meta.addTag({ property: 'og:title', content: this.property.nameProperty });

          this.meta.addTag({ name: 'twitter:title', content: this.property.nameProperty });

      
        }
      }
    );
    this.propertyService.getListofImages("property" , this.property.propertyId.toString()).subscribe({
      next: (response)=>{
        this.images = response;
        /*for (let i = 0; i < response.length; i++) {
          this.images.push({ 
             previewImageSrc: "https://k-konsult-server.online:80/K-Konsult/file/Get/images/property/"+this.property.propertyId+"/"+ response[i], 
             thumbnailImageSrc:  "https://k-konsult-server.online:80/K-Konsult/file/Get/images/property/"+this.property.propertyId+"/"+ response[i], 
             alt: "Description for Image "+i+", title: Title "+i
            }); 
            //this.setMetaTags();
         }*/
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
    && this.comment !== undefined && this.property.propertyId !== undefined){
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
    this.inqueryService.createInqueryForProperty(this.new_inquiry , this.property.propertyId ).subscribe({
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

