import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ArticleDto } from '../Interface/article.interface';
import { ArticleService } from '../Service/article.service';
import { PropertyService } from '../Service/property.service';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { response } from 'express';
import { TokenInterceptor } from '../Service/token-interceptor.service';
import { TokenService } from '../Service/token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root-blog',
  standalone: true,
  imports: [RouterOutlet ,
            RouterLink,
            RouterLinkActive,
            DataViewModule ,
            TagModule,
            CommonModule,
            ButtonModule , 
            CardModule ,
            ScrollPanelModule
  ],
  providers: [ ArticleService , PropertyService ,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor
  ] , 
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class Blog implements OnInit{
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  articles : ArticleDto[] = []
  title = 'k-konsult-web-home';
  constructor(
    private articleService: ArticleService ,
    private propertyService: PropertyService ,
    private deviceService: DeviceDetectorService , 
    private titles: Title, 
    private meta: Meta) {
      this.isMobile = this.deviceService.isMobile();
      this.isTablet = this.deviceService.isTablet();
      this.isDesktop = this.deviceService.isDesktop();
    }
  ngOnInit(){
    this.getAllArticle();
    this.setSlideNumber();
    this.setMetaTags();
   }
   
   private setSlideNumber() {
    const slideNumber = this.articles.length;
    document.documentElement.style.setProperty('--slide-number', slideNumber.toString());
  }


  setMetaTags() {
    this.titles.setTitle("Блог за имоти");
    this.meta.addTag({
        name: 'keywords',
        content: 'статии за имоти, статии за инфестиция, статия , статии , интерсни статии, инвестиция в бъдещето , имоти'
    });
    this.meta.addTag({
        name: 'description',
        content: 'Открийте идеалните имоти в София с K-Konsult – вашата партньорска агенция за недвижими имоти. Предлагаме продажба и наем на апартаменти, жилища и търговски обекти. Свържете се с нас за имоти, които отговарят на вашите нужди.'
      });
}


  getAllArticle(){
    this.articleService.getAllArticle().subscribe({
      next: (response)=>{
        this.articles = response;
        this.totalSlideNumber = this.articles.length;
      }
    })
  }


  private ticking = false;
  private startY: number = 0;
  isFirefox = /Firefox/i.test(navigator.userAgent);
  isIe = /MSIE/i.test(navigator.userAgent) || /Trident.*rv\:11\./i.test(navigator.userAgent);
  private scrollSensitivitySetting: number = 100; // Sensitivity for trackpad gestures
  private slideDurationSetting: number = 600; // Duration to lock slides
  public currentSlideNumber: number = 0;
  public totalSlideNumber: number = 0; // Update this based on the number of slides

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    this.handleScroll(event.deltaY);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startY = event.touches[0].clientY; // Store the starting Y position
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    this.handleTouchMove(event);
  }

  private handleScroll(deltaY: number) {
    if (!this.ticking) {
      if (deltaY <= -this.scrollSensitivitySetting) {
        // Down scroll
        this.ticking = true;
        if (this.currentSlideNumber < this.totalSlideNumber - 1) {
          this.currentSlideNumber++;
        }
        this.updateSlideClasses();
        this.slideDurationTimeout(this.slideDurationSetting);
      } else if (deltaY >= this.scrollSensitivitySetting) {
        // Up scroll
        this.ticking = true;
        if (this.currentSlideNumber > 0) {
          this.currentSlideNumber--;
        }
        this.updateSlideClasses();
        this.slideDurationTimeout(this.slideDurationSetting);
      }
    }
  }

  private handleTouchMove(event: TouchEvent) {
    const deltaY = this.startY - event.touches[0].clientY; // Calculate the difference

    if (!this.ticking) {
      if (deltaY >= this.scrollSensitivitySetting) {
        // Down swipe
        this.ticking = true;
        if (this.currentSlideNumber < this.totalSlideNumber - 1) {
          this.currentSlideNumber++;
        }
        this.updateSlideClasses();
        this.slideDurationTimeout(this.slideDurationSetting);
      } else if (deltaY <= -this.scrollSensitivitySetting) {
        // Up swipe
        this.ticking = true;
        if (this.currentSlideNumber > 0) {
          this.currentSlideNumber--;
        }
        this.updateSlideClasses();
        this.slideDurationTimeout(this.slideDurationSetting);
      }
    }
  }
  
  private slideDurationTimeout(slideDuration: number) {
    setTimeout(() => {
      this.ticking = false;
    }, slideDuration);
  }

  private nextItem() {
    if (this.currentSlideNumber < this.totalSlideNumber - 1) {
      this.updateSlideClasses();
    }
  }

  private previousItem() {
    if (this.currentSlideNumber > 0) {
      this.updateSlideClasses();
    }
  }

  private updateSlideClasses() {
    const slides = document.querySelectorAll('.background');
  
    slides.forEach((slide, index) => {
      slide.classList.remove('up-scroll', 'down-scroll');
  
      if (index === this.currentSlideNumber) {
        slide.classList.add('up-scroll'); // Current slide
      }
      if (index <= this.currentSlideNumber - 1) {
        slide.classList.add('down-scroll'); // Previous slide
      }
      if (index >= this.currentSlideNumber + 1) {
        slide.classList.add('up-scroll'); // Next slide
      }
    });


  }
}

