import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { PropertyService } from '../Service/property.service';
import { ArticleDto } from '../Interface/article.interface';
import { ArticleService } from '../Service/article.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../Service/token-interceptor.service';
import { TokenService } from '../Service/token.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root-news',
  standalone: true,
  imports: [RouterOutlet ,
            RouterLink,
            RouterLinkActive  ,
            ButtonModule,
            GalleriaModule , 
            FormsModule , 
            DividerModule , 
            DialogModule ,
            ScrollPanelModule
  ],
  providers: [ PropertyService ,  ArticleService ,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor
   ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class News implements OnInit{

  title = 'k-konsult-web-news';
  images: any[] = [];
  article: ArticleDto = {
    articleId: 0,
    title: '',
    content: ''
  }
 

  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  constructor(private propertyService: PropertyService , 
              private route: ActivatedRoute , 
              private articleService: ArticleService,    
              private deviceService: DeviceDetectorService ,
              private titles: Title, 
              private meta: Meta ) {

              this.isMobile = this.deviceService.isMobile();
              this.isTablet = this.deviceService.isTablet();
              this.isDesktop = this.deviceService.isDesktop();
              }


  articleid: number | null = null; 

  ngOnInit(){
    this.articleid  = Number(this.route.snapshot.paramMap.get('articleTitle'));
    this.meta.addTag({ property: 'og:description', content: `Избери своя имот днес.` });
    this.meta.addTag({ property: 'og:image', content: `https://k-konsult-server.online:80/K-Konsult/file/Get/images/article/${this.articleid.toString()}/image1.png` });
    this.meta.addTag({ property: 'og:url', content: `https://k-konsult.bg/news/${this.articleid.toString()}` });
    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({ name: 'twitter:description', content: `https://k-konsult-server.online:80/K-Konsult/file/Get/images/article/${this.articleid.toString()}/image1.png` });
    this.meta.addTag({ property: 'og:description', content: `Избери своя имот днес.` });
    if(this.articleid!== undefined && this.articleid!== null){
    this.article.articleId = this.articleid;
  }
  this.getArticle();
  }

  getArticle(){
    if(this.article.title !== undefined){
    this.articleService.getArticleById(this.article.articleId).subscribe(
      {
        next: (response)=>{
          this.article = response;
          this.meta.addTag({ property: 'og:title', content: this.article.title });
          this.meta.updateTag({ name: 'twitter:title', content: this.article.title });

        }
      }
    );
    this.propertyService.getListofImages("article",this.article.articleId.toString()).subscribe({
      next: (response)=>{
        this.images = [];
        for (let i = 0; i < response.length; i++) {
          this.images.push({ 
             previewImageSrc: "https://k-konsult-server.online:80/K-Konsult/file/Get/images/article/"+this.article.articleId+"/"+ response[i], 
             thumbnailImageSrc:  "https://k-konsult-server.online:80/K-Konsult/file/Get/images/article/"+this.article.articleId+"/"+ response[i], 
             alt: "Description for Image "+i+", title: Title "+i
            }); 
         }
      }
    });
  
  }
  }

  displayModal: boolean = false;
  openGalleryModal() {
    this.displayModal = true;
    // Можете да добавите и допълнителна логика, ако е необходимо.
  }


  
}

