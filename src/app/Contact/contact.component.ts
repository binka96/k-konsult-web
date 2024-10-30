import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-root-contact',
  standalone: true,
  imports: [RouterOutlet ,CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class Contact implements OnInit{

  title = 'k-konsult-web-home';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  constructor( private deviceService: DeviceDetectorService)
{
this.isMobile = this.deviceService.isMobile();
this.isTablet = this.deviceService.isTablet();
this.isDesktop = this.deviceService.isDesktop();
}

checkIfMobile() {
  this.checkIfMobile();

  this.isMobile = window.innerWidth <= 768; // Можете да промените 768 на желаната ширина
}

  ngOnInit(){
    this.elements = Array.from(document.querySelectorAll(' .text3 , .circlePic1 , .circlePic2 , .text4 , .text5 , .pic30, .pic44, .pic43, .pic31, .pic32 , .pic42 , .pic29 , .text6 , .text7 , .text8 '));
  }
     // Масив с елементите
     elements: HTMLElement[] = [];



     
     @HostListener('window:scroll', [])
     onWindowScroll() {
       const windowHeight = window.innerHeight;
   
       this.elements.forEach(element => {
         const { top } = element.getBoundingClientRect();
         if (top < windowHeight - 50 || this.isMobile) { 
           element.classList.add('active');
         } else {
           element.classList.remove('active'); // Remove active class when the element is not in view
         }
       });
     }
  
}

