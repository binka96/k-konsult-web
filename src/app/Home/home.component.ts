import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MessageService } from 'primeng/api';
import { TokenService } from '../Service/token.service';
import { UserService } from '../Service/user.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-root-home',
  standalone: true,
  imports: [RouterOutlet ,
            RouterLink,
            RouterLinkActive,
            MenubarModule ,
            MegaMenuModule ,
            ButtonModule ,
            CommonModule,
            AnimateOnScrollModule
  ],
  providers: [MessageService ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class Home implements OnInit{

  title = 'k-konsult-web-home';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  constructor( private router: Router ,  
               private messageService: MessageService,
               private deviceService: DeviceDetectorService)
  {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();
  }
  ngOnInit(){
    this.elements = Array.from(document.querySelectorAll(' .header2,  .grey-area2, .grey-area3, .grey-area4 , .header3 , .group30 , .group31, .group32 , .group43 , .group42  , .group29 , .img-buttomInqiyre'));
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
         element.classList.add('active1');
         element.classList.add('active2');
         element.classList.add('active3');
       } else {
         element.classList.remove('active'); // Remove active class when the element is not in view
         element.classList.remove('active1');
         element.classList.remove('active2');
         element.classList.remove('active3');
       }
     });
   }


}

