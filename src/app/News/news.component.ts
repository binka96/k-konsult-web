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
    title: '',
    content: ''
  }
  constructor (private propertyService: PropertyService , private route: ActivatedRoute , private articleService: ArticleService){
  
  }
  ngOnInit(){
    const articleTitle  = this.route.snapshot.paramMap.get('articleTitle');
    if(articleTitle!== undefined && articleTitle!== null){
    this.article.title = articleTitle.toString();
  }
  this.getArticle();
  }

  getArticle(){
    if(this.article.title !== undefined){
    this.articleService.getArticleByTitle(this.article.title).subscribe(
      {
        next: (response)=>{
          this.article = response;
        }
      }
    );
    this.propertyService.getListofImages(this.article.title).subscribe({
      next: (response)=>{
        this.images = [];
        for (let i = 0; i < response.length; i++) {
          this.images.push({ 
             previewImageSrc: "http://192.168.182.130:8080/K-Konsult/file/Get/images/"+this.article.title+"/"+ response[i], 
             thumbnailImageSrc:  "http://192.168.182.130:8080/K-Konsult/file/Get/images/"+this.article.title+"/"+ response[i], 
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

