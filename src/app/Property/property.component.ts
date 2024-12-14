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
import { isRegExp } from 'node:util/types';



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
      {"type": "Студио"},
      {"type": "Четиристаен"},
      {"type": "Мезонет"},
      {"type": "Гарсониера"},
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
    price : number = 0;
    pricePerQuadrature : number = 0 ;
    quadrature : number =0 ;
    construction !: string;
    typeOfConstructions: any[] = [
      {"type": "Ново строителство"},
      {"type": "Старо строителство"},
    ]

    ad: any[]=[
      {"offer": "DARIA RESIDENCE"},
      {"offer": "EXCLUSIVE"},
      {"offer": "Обикновена обява"},
    ]
    selectad: any;
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
  propertyIds: any[] = [];
  selectedpropertyId!: any;
  property: PropertyDto ={
    propertyId: 0,
    nameProperty: "", type: "",
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
    owenerName: '',
    ownerLastName: '',
    ownerPhone: '',
    ad: '',
    place: {
      id: 0,
      name: ''
    },
    neighborhood: {
      id: 0,
      name: ''
    }
  };
  imagesList : any[] = [];
  selectImage: any = "";
  properties: string[] = [];
  propertiesIds: number[] = [];
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
    this.dialogAddNewImage=false;
    this.getPropertyInformationUpdate();
  }

}

preventSpecialCharacters(event: KeyboardEvent) {
  const regex = new RegExp("^[a-zA-Z0-9a-яА-Я\\s.]*$");
  if (!regex.test(event.key)) {
      event.preventDefault();
  }
}

createProperty(){
  if(this.nameProperty!== undefined && this.selectedType !== undefined && this.selectedCity!== undefined &&
    this.selectedCategory !== undefined && this.price!== undefined &&
    this.pricePerQuadrature !== undefined && this.quadrature !== undefined && this.construction !== undefined &&
    this.selectedTypeOfConstruction!== undefined && this.akt !== undefined && this.description !== undefined &&
    this.yearOfConstruction !== undefined && this.floor !== undefined && this.floors !== undefined &&
    this.ownerName !== undefined && this.ownerLastName !== undefined &&
    this.ownerPhone !== undefined && this.selectad !== undefined){

      this.property.nameProperty = this.nameProperty;
      this.property.type = this.selectedType.type;
      this.property.place.id = this.selectedCity.id;
      this.property.place.name = this.selectedCity.name;
      if(this.selectedNeighborhood!==undefined){
        this.property.neighborhood = this.selectedNeighborhood;
      }
      else{
        this.property.neighborhood.id=0
        this.property.neighborhood.name="null"
      }
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
      this.property.owenerName  = this.ownerName;
      this.property.ownerLastName = this.ownerLastName;
      this.property.ownerPhone = this.ownerPhone;
      this.property.ad = this.selectad.offer;
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


/*getAllPrpopertiesId(){
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
}*/



getAllPrpopertiesId(){
  this.propertyService.getAllPropertyIds().subscribe(
    {
      next: (response)=>{
        this.propertiesIds = [];
        this.propertiesIds = response;
        this.propertyIds = [];
        for(let i=0;i<this.propertiesIds.length;i++){
          
          this.propertyIds.push({propertyId: this.propertiesIds[i]});
        }
      }
    }
  );
}

/*getPropertyInformation(){
  if(this.selectednameProperties.name !== undefined){
  this.propertyService.getGetPropertyByName(this.selectednameProperties.name).subscribe(
    {
      next: (response)=>{
        this.property = response;
      }
    }
  );

}
}*/

getPropertyInformation(){
  if(this.selectedpropertyId.propertyId !== undefined){
  this.propertyService.getGetPropertyById(this.selectedpropertyId.propertyId).subscribe(
    {
      next: (response)=>{
        this.property = response;
      }
    }
  );

}
}


getPropertyInformationUpdate(){
  if(this.selectedpropertyId.propertyId !== undefined){
  this.propertyService.getGetPropertyById(this.selectedpropertyId.propertyId).subscribe(
    {
      next: (response)=>{
        this.property = response;
        this.selectedType = this.property.type;
        this.selectedCity  = this.property.place;
        this.selectedNeighborhood = this.property.neighborhood;
        this.selectedTypeOfConstruction = this.property.typeOfConstruction;
      }
    }
  );
  this.propertyService.getListofImages("property",this.selectedpropertyId.propertyId).subscribe({
    next: (response)=>{
      this.images = [];
      for (let i = 0; i < response.length; i++) {
        this.images.push({ 
           previewImageSrc: "https://k-konsult-server.online:80/K-Konsult/file/Get/images/property/"+this.selectedpropertyId.propertyId+"/"+ response[i], 
           thumbnailImageSrc:  "https://k-konsult-server.online:80/K-Konsult/file/Get/images/property/"+this.selectedpropertyId.propertyId+"/"+ response[i], 
           alt: "Description for Image "+i+", title: Title "+i
          }); 
       }
    }
  });

}
}
deleteProperty(){
  if(this.selectedpropertyId !== undefined){
    this.propertyService.deleteProperty(this.selectedpropertyId.propertyId).subscribe(
      {
        next: (response)=>{
          this.messageService.add(
            {
              severity: 'info',
              summary: response.message
            }
          );
          this.propertyService.deleteFolder("property",this.selectedpropertyId.propertyId).subscribe({
            next: (response)=>{
              this.getAllPrpopertiesId(); 
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
  if(this.selectImage!== undefined && this.selectImage.file !== null && this.selectedpropertyId.propertyId !== undefined){
    this.propertyService.deleteImage("property",this.selectedpropertyId.propertyId  , this.selectImage.file).subscribe({
      next: (response)=>{
        this.getPropertyInformationUpdate();
        this.messageService.add(
          {
            severity: 'info',
            summary: response.message
          });
          this.propertyService.getListofImages("property" ,this.selectedpropertyId.propertyId).subscribe({
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
  
  if(this.selectedpropertyId.propertyId !== undefined){
    this.deleteImageDialogVisivle = true;
    this.propertyService.getListofImages("property",this.selectedpropertyId.propertyId).subscribe({
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
  if(this.selectedpropertyId.propertyId!== undefined && this.selectedpropertyId.propertyId!==""){
    this.dialogAddNewImage = true;
  }else{
    this.messageService.add({severity: 'info', summary: 'Имота който се опитвате да качите няма име!', detail: ''});
  }
}

 updateProperty(){
  if(this.selectad!==undefined && this.selectedCategory!==undefined){
      this.property.category = this.selectedCategory.type;
      this.property.ad = this.selectad.offer;
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
    else{
      this.messageService.add(
        {
          severity: 'error',
          summary: "Не е избран тип обява и категория!;"
        }
      );
    }
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
  this.selectedNeighborhood = { name: '', id : 0};;
  this.property.neighborhood = { name: '', id : 0};
  if(this.selectedCity !== undefined){
    this.placeService.getAllNeiberhood(this.selectedCity.id).subscribe({
      next: (response) =>
      {
        this.neighborhoods = response;
        if(response.length == 0){
          this.neighberhoodListVisible = true;
          this.selectedNeighborhood.name = "null";
        }
        else{
          this.neighberhoodListVisible = false;
        }
        
      }
    })
  }
}


calculatePricePerQuadrature() {
  if (this.quadrature > 0 && this.price >0 ) { // Проверяваме дали quadrature не е нула
    this.pricePerQuadrature = this.price / this.quadrature;
  } else {
    this.pricePerQuadrature = 0; // Предотвратяваме деление на нула
  }
}

onPriceChange() {
  this.calculatePricePerQuadrature();
}

onQuadratureChange() {
  this.calculatePricePerQuadrature();
}

calculatePricePerQuadratureProperty(){
  if (this.property!==undefined && this.property.price>0 && this.property.quadrature> 0 ) { // Проверяваме дали quadrature не е нула
    this.property.pricePerQuadrature = this.property.price / this.property.quadrature;
  } else {
    this.property.pricePerQuadrature = 0; // Предотвратяваме деление на нула
  }
}

onPriceChangeProperty(){
  this.calculatePricePerQuadratureProperty();
}

onQuadratureChangeProperty() {
  this.calculatePricePerQuadratureProperty();
}



}
