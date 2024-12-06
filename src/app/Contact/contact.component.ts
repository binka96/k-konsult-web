import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-root-contact',
  standalone: true,
  imports: [RouterOutlet ,
            CommonModule,
            RouterLink,
            RouterLinkActive,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class Contact implements OnInit{

  title = 'k-konsult-web-contact';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  constructor( private deviceService: DeviceDetectorService,
    private titles: Title, 
    private meta: Meta
  )
{
this.isMobile = this.deviceService.isMobile();
this.isTablet = this.deviceService.isTablet();
this.isDesktop = this.deviceService.isDesktop();
}

checkIfMobile() {
  this.checkIfMobile();

}

  ngOnInit(){
    this.titles.setTitle('К-Консулт контакти');
    this.setMetaTags();
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

     setMetaTags() {
      this.meta.addTag({ 
          name: 'keywords', 
          content: 'К-Консулт, агенция за имоти, недвижими имоти, услуги за недвижими имоти, продажба на жилища, наем на имоти, имоти в София, купуване на апартаменти, консултации за имоти, маркетинг на имоти' 
      });
      
      this.meta.addTag({ 
          name: 'description', 
          content: 'К-Консулт предлага професионални услуги за недвижими имоти в София. С нас ще получите индивидуално отношение и помощ при покупка, продажба и наем на имоти. Свържете се с нас, за да намерите мечтания дом или търговски обект!' 
      });
  }
}

