import { Component, CUSTOM_ELEMENTS_SCHEMA,  OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  MegaMenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import {MegaMenuModule} from 'primeng/megamenu';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { UploadEvent } from '../Interface/upload-event.interface';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { PropertyDto } from '../Interface/property.interface';
import { PropertyService } from '../Service/property.service';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { response } from 'express';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../Service/token-interceptor.service';
import { TokenService } from '../Service/token.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PlaceService } from '../Service/place.service';
import { CascadeSelectModule } from 'primeng/cascadeselect';



@Component({
  selector: 'property-root',
  standalone: true,
  imports: [RouterOutlet , 
            MenubarModule ,
            MegaMenuModule , 
            FileUploadModule , 
            CommonModule,
            ListboxModule,
            ScrollPanelModule,
            ButtonModule,
            TabViewModule,
            ToastModule , 
            InputNumberModule,
            InputTextareaModule,
            CheckboxModule,
            InputTextModule,
            FormsModule , 
            DividerModule , 
            DialogModule , 
            GalleriaModule ,
            CascadeSelectModule
            ],
  providers: [MessageService , PropertyService , PlaceService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor
  ] , 
  templateUrl: './property.component.html',
  styleUrl: './property.component.scss' ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Property implements OnInit {
  title = 'Inquiers';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  dialogAddImage : boolean = false;
  dialogAddNewImage : boolean = false
  upload_image: boolean = true;
  uploadedFiles: any[] = [];
  images: any[] = [];
  deleteImageDialogVisivle: boolean = false;
  neighberhoodListVisible: boolean = true;
    //Property
    nameProperty !: string;
    typeProperty : any[] = [
      {"type": "Едностаен"},
      {"type": "Двустаен"},
      {"type": "Тристаен"},
      {"type": "Магазин"},
      {"type": "Къща"},
      {"type": "Офис"},
      {"type": "Гараж"},
    ];
    selectedType : any;
    cities : any[] = []
    citiesWithoutArea: any[]=[]
    selectedCity : any;
    neighborhoods : any[] = [ ];
    selectedNeighborhood : any;
  
    categories: any[] = [
      {"type": "Продажби"},
      {"type": "Наеми"},
    ]
    selectedCategory : any;
    price !: number ;
    pricePerQuadrature !: number ;
    quadrature !: number ;
    construction !: string;
    typeOfConstructions: any[] = [
      {"type": "Ново строителство"},
      {"type": "Старо строителство"},
    ]
    selectedTypeOfConstruction : any;
    akt!: string
    description!: string;
    yearOfConstruction!: number;
    floor!: number;
    floors!: number;
    elevator!: boolean;
    ownerName!: string;
    ownerLastName!: string;
    ownerPhone!: string;


  nameProperties: any[] = []
  selectednameProperties!: any;
  property: PropertyDto ={
    nameProperty: "", type: "", town: "", neighborhood: "",
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
    owenerName: '',
    ownerLastName: '',
    ownerPhone: ''
  };
  imagesList : any[] = [];
  selectImage: any = "";
  properties: string[] = [];
  activeIndex: number = 0;
  constructor(private messageService: MessageService , 
              private propertyService: PropertyService ,
              private deviceService: DeviceDetectorService,
              private placeService: PlaceService ) {

              this.isMobile = this.deviceService.isMobile();
              this.isTablet = this.deviceService.isTablet();
              this.isDesktop = this.deviceService.isDesktop();}
              

  ngOnInit() {
    this.neighberhoodListVisible = true;
    this.getAllPlaces();
    this.getAllPlacesWithoutArea();
    
  }
  onUpload(event:UploadEvent) {
    if(this.nameProperty!== undefined && this.nameProperty!==""){
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded'});
    this.dialogAddNewImage=false;
    this.getPropertyInformationUpdate();

  }else{
    this.messageService.add({severity: 'info', summary: 'Имата който се опитвате да качите няма име!', detail: ''});
    this.dialogAddNewImage=false;
    this.getPropertyInformationUpdate();
  }

}

createProperty(){
  if(this.nameProperty!== undefined && this.selectedType !== undefined && this.selectedCity!== undefined &&
    this.selectedNeighborhood !== undefined && this.selectedCategory !== undefined && this.price!== undefined &&
    this.pricePerQuadrature !== undefined && this.quadrature !== undefined && this.construction !== undefined &&
    this.selectedTypeOfConstruction!== undefined && this.akt !== undefined && this.description !== undefined &&
    this.yearOfConstruction !== undefined && this.floor !== undefined && this.floors !== undefined &&
    this.elevator !== undefined && this.ownerName !== undefined && this.ownerLastName !== undefined &&
    this.ownerPhone !== undefined ){

      this.property.nameProperty = this.nameProperty;
      this.property.type = this.selectedType.type;
      this.property.town = this.selectedCity.name;
      this.property.neighborhood = this.selectedNeighborhood.name;
      this.property.category = this.selectedCategory.type;
      this.property.price = this.price;
      this.property.pricePerQuadrature = this.pricePerQuadrature;
      this.property.quadrature = this.quadrature;
      this.property.construction  = this.construction;
      this.property.typeOfConstruction = this.selectedTypeOfConstruction.type;
      this.property.akt=this.akt;
      this.property.description = this.description;
      this.property.yearOfConstruction =  this.yearOfConstruction;
      this.property.floar = this.floor;
      this.property.floars = this.floors;
      this.property.elevator = this.elevator;
      this.property.owenerName  = this.ownerName;
      this.property.ownerLastName = this.ownerLastName;
      this.property.ownerPhone = this.ownerPhone;
      this.propertyService.createProperty(this.property).subscribe({
        next: (response)=>{
          this.messageService.add(
            {
              severity: 'info',
              summary: response.message
            }
          );
        }
      });
    }else{
      this.messageService.add(
        {
          severity: 'error',
          summary: "Полетата не са попълнени!"
        }
      );
    }
}


getAllPrpoperty(){
  this.propertyService.getAllProperty().subscribe(
    {
      next: (response)=>{
        this.properties = [];
        this.properties = response;
        this.nameProperties = [];
        for(let i=0;i<this.properties.length;i++){
          
          this.nameProperties.push({name: this.properties[i]});
        }
      }
    }
  );
}

getPropertyInformation(){
  if(this.selectednameProperties.name !== undefined){
  this.propertyService.getGetPropertyByName(this.selectednameProperties.name).subscribe(
    {
      next: (response)=>{
        this.property = response;
      }
    }
  );

}
}

getPropertyInformationUpdate(){
  if(this.selectednameProperties.name !== undefined){
  this.propertyService.getGetPropertyByName(this.selectednameProperties.name).subscribe(
    {
      next: (response)=>{
        this.property = response;
        this.selectedType = this.property.type;
        this.selectedCity  = this.property.town;
        this.selectedNeighborhood = this.property.neighborhood;
        this.selectedCategory = this.property.category;
        this.selectedTypeOfConstruction = this.property.typeOfConstruction;
      }
    }
  );
  this.propertyService.getListofImages(this.selectednameProperties.name).subscribe({
    next: (response)=>{
      this.images = [];
      for (let i = 0; i < response.length; i++) {
        this.images.push({ 
           previewImageSrc: "http://192.168.236.130:8080/K-Konsult/file/Get/images/"+this.selectednameProperties.name+"/"+ response[i], 
           thumbnailImageSrc:  "http://192.168.236.130:8080/K-Konsult/file/Get/images/"+this.selectednameProperties.name+"/"+ response[i], 
           alt: "Description for Image "+i+", title: Title "+i
          }); 
       }
    }
  });

}
}
deleteProperty(){
  if(this.selectednameProperties !== undefined){
    this.propertyService.deleteProperty(this.selectednameProperties.name).subscribe(
      {
        next: (response)=>{
          this.messageService.add(
            {
              severity: 'info',
              summary: response.message
            }
          );
          this.propertyService.deleteFolder(this.selectednameProperties.name).subscribe({
            next: (response)=>{
              this.getAllPrpoperty(); 
            }
          });
        }
      }
    )
  }
  else{
    this.messageService.add(
      {
        severity: 'error',
        summary: "Не избран имот!"
      }
    );
  }
}
deleteImage(){
  if(this.selectImage!== undefined && this.selectImage.file !== null && this.selectednameProperties.name !== undefined){
    this.propertyService.deleteImage(this.selectednameProperties.name  , this.selectImage.file).subscribe({
      next: (response)=>{
        this.getPropertyInformationUpdate();
        this.messageService.add(
          {
            severity: 'info',
            summary: response.message
          });
          this.propertyService.getListofImages(this.selectednameProperties.name).subscribe({
            next: (response)=>{
              this.imagesList = [];
              for (let i = 0; i < response.length; i++) {
                  this.imagesList.push({file : response[i]})
               }
            }
          });
      }
    });
  }
  else{
    this.messageService.add(
      {
        severity: 'info',
        summary: "Не е избрана снимка "
      }
    );
  }
}

deleteImageDialog(){
  
  if(this.selectednameProperties.name !== undefined){
    this.deleteImageDialogVisivle = true;
    this.propertyService.getListofImages(this.selectednameProperties.name).subscribe({
      next: (response)=>{
        this.imagesList = [];
        for (let i = 0; i < response.length; i++) {
            this.imagesList.push({file : response[i]})
         }
      }
    });
  }
}
addPicture(){
  if(this.nameProperty!== undefined && this.nameProperty!==""){
    this.dialogAddImage = true;
  }else{
    this.messageService.add({severity: 'info', summary: 'Имота който се опитвате да качите няма име!', detail: ''});
  }
}


addNewPicture(){
  if(this.property.nameProperty!== undefined && this.property.nameProperty!==""){
    this.dialogAddNewImage = true;
  }else{
    this.messageService.add({severity: 'info', summary: 'Имота който се опитвате да качите няма име!', detail: ''});
  }
}

 updateProperty(){
  
      this.propertyService.updateProperty(this.property).subscribe({
        next: (response)=>{
          this.messageService.add(
            {
              severity: 'info',
              summary: response.message}
          );
        }
      });
 }
displayModal: boolean = false;
openGalleryModal() {
  this.displayModal = true;
  // Можете да добавите и допълнителна логика, ако е необходимо.
}

getAllPlaces(){
  this.placeService.getAllPlaces().subscribe({
    next: (response)=>{
      this.cities = response;
    }
  })
}

getAllPlacesWithoutArea(){
  this.placeService.getAllPlacesWithoutArea().subscribe({
    next: (response)=>{
      this.citiesWithoutArea = response;
    }
  })
}

getNeighberhood(){
      
  if(this.selectedCity !== undefined){
    this.placeService.getAllNeiberhood(this.selectedCity.id).subscribe({
      next: (response) =>
      {
        this.neighborhoods = response;
        if(response.length == 0){
          this.neighberhoodListVisible = true;
        }
        else{
          this.neighberhoodListVisible = false;
        }
        
      }
    })
  }
}

}
