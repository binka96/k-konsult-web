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
import { GalleriaModule } from 'primeng/galleria';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root-home',
  standalone: true,
  imports: [RouterOutlet ,
            RouterLink,
            RouterLinkActive,
            ButtonModule ,
            CommonModule,
            GalleriaModule,
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
  images: any[] = [];
  constructor( private router: Router ,  
               private messageService: MessageService,
               private deviceService: DeviceDetectorService,
               private titles: Title, 
               private meta: Meta)
  {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();
  }
  ngOnInit(){
    this.image();
    this.titles.setTitle('К-Консулт');
    this.setMetaTags();
  }
  
  image(){
    this.images = [
      {previewImageSrc: "assets/DariaResidence/image_1.jpg"},
      {previewImageSrc: "assets/DariaResidence/image_2.jpg"},
      {previewImageSrc: "assets/DariaResidence/image_3.jpg"}, 
      {previewImageSrc: "assets/DariaResidence/image_4.jpg"},
      {previewImageSrc: "assets/DariaResidence/image_5.jpg"}

    ]
  }



  setMetaTags() {
    this.meta.addTag({
      name: 'keywords',
      content: 'K-Konsult, агенция за имоти, имоти, продажба на имоти, наем на имоти, имоти София, апартаменти под наем, продажба на апартаменти, търговски имоти, ново строителство, имоти за инвестиции, краткосрочен и дългосрочен наем'
  });
  this.meta.addTag({
      name: 'description',
      content: 'Открийте идеалните имоти в София с K-Konsult – вашата партньорска агенция за недвижими имоти. Предлагаме продажба и наем на апартаменти, жилища и търговски обекти. Свържете се с нас за имоти, които отговарят на вашите нужди.'
  });

}



}

