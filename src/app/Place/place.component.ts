import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { PlaceService } from '../Service/place.service';
import { PropertyService } from '../Service/property.service';
import { TokenInterceptor } from '../Service/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from '../Service/token.service';
import { MessageService } from 'primeng/api';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { response } from 'express';
@Component({
  selector: 'app-root-contact',
  standalone: true,
  imports: [RouterOutlet ,
            CommonModule,
            RouterLink,
            RouterLinkActive,
            TabViewModule,
            ToastModule,
            CommonModule,
            FormsModule,
            CascadeSelectModule,
            ListboxModule,
            DropdownModule,
            InputTextModule,
            ButtonModule
  ],
  providers: [MessageService , PropertyService , PlaceService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor
  ] , 
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss'
})
export class Place implements OnInit{

  title = 'k-konsult-web-home';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  constructor( private deviceService: DeviceDetectorService , 
                private placeService: PlaceService,
                private messageService: MessageService 
  )
{
this.isMobile = this.deviceService.isMobile();
this.isTablet = this.deviceService.isTablet();
this.isDesktop = this.deviceService.isDesktop();
}

cities : any[] = []
citiesWithoutArea: any[]=[]
selectedCity : any;
neighborhoods : any[] = [ ]
selectedNeighborhood : any;
neighberhoodListVisible: boolean = true;
nameNeiberHood: string= "";
nameNeiberHoodRename: string = "";
renameTown: string = "";
    ngOnInit(){
        this.getAllPlaces();
        this.getAllPlacesWithoutArea();
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

      addNeiberhood(){
        if(this.selectedCity!==undefined && this.nameNeiberHood!==undefined){
            this.placeService.addNeiberhood(this.selectedCity.id, this.nameNeiberHood).subscribe({
                next: (response) =>{
                    this.messageService.add(
                        {
                          severity: 'info',
                          summary: response.message
                        }
                      );
                      this.getAllPlaces();
                      this.getAllPlacesWithoutArea();
                }
            })
        }else{
            this.messageService.add(
                {
                  severity: 'error',
                  summary: "Не е избран град/село или не е сложено име!"
                }
              );
        }
      }

      selectNeighberhood(){
        this.nameNeiberHoodRename = this.selectedNeighborhood.name;
      }

      seclectTown()
      {
        this.renameTown = this.selectedCity.name;
      }
      updateNeighborhood(){
        if(this.selectNeighberhood!==undefined && this.nameNeiberHood!==undefined){
            this.placeService.updateNeiberhood(this.selectedNeighborhood.id, this.nameNeiberHoodRename).subscribe({
                next: (response) =>{
                    this.messageService.add(
                        {
                          severity: 'info',
                          summary: response.message
                        }
                      );
                      this.getAllPlaces();
                      this.getAllPlacesWithoutArea();
                }
            })
        }else{
            this.messageService.add(
                {
                  severity: 'error',
                  summary: "Не е избран квартал или не е сложено име!"
                }
              );
        }
    }

    updateCityName(){
        if(this.selectedCity!== undefined && this.renameTown!== undefined){
            this.placeService.updateCity(this.selectedCity.id , this.renameTown).subscribe({
                next: (response)=>{
                    this.messageService.add(
                        {
                          severity: 'info',
                          summary: response.message
                        }
                      );
                }
            })
        }else{
            this.messageService.add(
                {
                  severity: 'error',
                  summary: "Не е избран град/село или не е сложено име!"
                }
              );
        }
    }
}
