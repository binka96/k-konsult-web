import { Component, OnInit } from '@angular/core';
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
  ],
  providers: [ ArticleService , PropertyService ,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor
  ] , 
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class Blog implements OnInit{

  articles : ArticleDto[] = []
  title = 'k-konsult-web-home';
  constructor(
    private articleService: ArticleService ,
    private propertyService: PropertyService ) {}
  ngOnInit(){
    this.getAllArticle();
  }

  getAllArticle(){
    this.articleService.getAllArticle().subscribe({
      next: (response)=>{
        this.articles = response;
      }
    })
  }
}

