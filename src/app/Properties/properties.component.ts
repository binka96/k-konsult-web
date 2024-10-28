import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PropertyService } from '../Service/property.service';
import { CardModule } from 'primeng/card';
import { PropertyInfoDto } from '../Interface/propertyinformation.interface';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TokenInterceptor } from '../Service/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from '../Service/token.service';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root-properties',
  standalone: true,
  imports: [RouterOutlet ,
            RouterLink,
            RouterLinkActive,
            DataViewModule ,
            TagModule,
            CommonModule,
            ButtonModule , 
            CardModule , 
            DropdownModule,
            FormsModule,
            InputNumberModule,
            ScrollPanelModule
  ],
  providers: [ PropertyService , 
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor
  ] , 
  
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class Properties implements OnInit{

  title = 'k-konsult-web-properties';
  properties: PropertyInfoDto[] = [];
  propertiesFilter: PropertyInfoDto[] = [];
  pageText: string = "";
  selectedType : any;
  text2 : any = {};
  background: any = {};
  cities : any[] = [
    {"name": "Самоков"},
    {"name": "Сандански"},
    {"name": "София"},
    {"name": "Перник"},
    {"name": "Дупница"},
    {"name": "Благовеград"},
    {"name": "Костенец"},
    {"name": "Пловдив"},
  ]
  selectedCity : any;
  neighborhoods : any[] = [
    {"neighborhood": "кв Възраждане"},
    {"neighborhood": "кв Самоково"},
    {"neighborhood": "кв Младост"},
    {"neighborhood": "кв Овча купел"},
    {"neighborhood": "кв Люлин 1"},
    {"neighborhood": "кв Люлин 2"},
    {"neighborhood": "кв Люлин 3"},
    {"neighborhood": "кв Люлин 4"},
  ]
  selectedNeighborhood : any;
  priceTo: number | undefined;
  priceFrom!: number | undefined;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  constructor (private propertyService: PropertyService ,
                private route: ActivatedRoute , 
                private deviceService: DeviceDetectorService
  ){
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();
  }
  ngOnInit(){
    const p_type  = this.route.snapshot.paramMap.get('type');
    const p_category  = this.route.snapshot.paramMap.get('category');
    if(p_category==="all"){
      this.pageText = "Всички имоти"
      this.text2 = {  'position': 'relative' ,  'top': 'calc(2vw * 0.4)' ,'left': 'calc(90.5vw * 0.4)'};
      this.background = { 'background-image': " url('/assets/images/searchFon.png')"}
    }
    if(p_category==="Продажби"){
      this.pageText = "Продажби на имоти"
      this.text2 = {  'position': 'relative' ,  'top': 'calc(2vw * 0.4)' ,'left': 'calc(75.5vw * 0.4)'};
      this.background = { 'background-image': " url('/assets/images/searchFon.png')"}
    }
    if(p_category==="Наеми"){
      this.pageText = "Имоти под наем"
      this.text2 = {  'position': 'relative' ,  'top': 'calc(2vw * 0.4)' ,'left': 'calc(85.5vw * 0.4)'};
      this.background = { 'background-image': " url('/assets/images/rentPicture.png')"}
    }
    if(p_category === "all"){
      this.getAllProperty();
    }
    else if(p_type !== null  && p_category!== null ){
      this.getAllPropertyByTypeAndCategory(p_type , p_category );
    }
    else if( p_category !== null &&  p_type === null  ){
      this.getAllPropertyByCategory( p_category );
    }
  }
  

  getAllProperty(){
    this.propertyService.getProperties().subscribe({
      next: (response)=>
      {
        this.properties = response
        this.propertiesFilter = response
      }
    });
  }

  getAllPropertyByCategory(category : string){
    this.propertyService.getPropertiesByCategory(category).subscribe({
      next: (response)=>
      {
        this.properties = response
        this.propertiesFilter = response
      }
    });
  }

  getAllPropertyByTypeAndCategory(type : string , category : string){
    this.propertyService.getPropertiesByTypeAndCategory(type , category).subscribe({
      next: (response)=>
      {
        this.properties = response
        this.propertiesFilter = response
      }
    });
  }

  filter() {
    // Check if properties is defined
    if (this.properties === undefined) {
        return; // Exit early if properties is undefined
    }

    this.propertiesFilter = [];

    for (let i = 0; i < this.properties.length; i++) {
        const property = this.properties[i];
        
        // Check for selectedCity's name and ensure it's not null or undefined
        const matchesCity = this.selectedCity!==undefined && this.selectedCity.name !== null 
                            && property.town === this.selectedCity.name;

        // Check for selectedNeighborhood's neighborhood and ensure it's not null or undefined
        const matchesNeighborhood = this.selectedNeighborhood!==undefined && this.selectedNeighborhood.neighborhood !== null 
                                    && property.neighborhood === this.selectedNeighborhood.neighborhood;

        const matchesPrice = (this.priceFrom === undefined || property.price > this.priceFrom) &&
                             (this.priceTo === undefined || property.price < this.priceTo);

        // Determine if the property should be pushed based on the selected filters
        if (matchesCity && matchesPrice && 
           (this.selectedNeighborhood === undefined || matchesNeighborhood)) {
            this.propertiesFilter.push(property);
        }
    }
}

  clearFilters(){
    this.selectedCity = undefined;
    this.selectedNeighborhood = undefined;
    this.priceFrom = undefined;
    this.priceTo = undefined;
    this.propertiesFilter = this.properties;

  }


    private speeds = [0.3, 0.5, 0.7]; 
    @HostListener('window:scroll', [])
    onWindowScroll() {
      const scrollY = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
  
      parallaxElements.forEach((el: Element, index: number) => {
        const speed = this.speeds[index] || 0.5; // Вземете скоростта от масива
        const offset = scrollY * speed;
  
        const parallaxElement = el as HTMLElement;
        parallaxElement.style.transform = `translateY(${offset}px)`;
      });
    }
  
}

