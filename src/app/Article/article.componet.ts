import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import {MegaMenuModule} from 'primeng/megamenu';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ArticleDto } from '../Interface/article.interface';
import { ArticleService } from '../Service/article.service';
import { response } from 'express';
import { ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { GalleriaModule } from 'primeng/galleria';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { UploadEvent } from '../Interface/upload-event.interface';
import { PropertyService } from '../Service/property.service';
import { TokenService } from '../Service/token.service';
import { TokenInterceptor } from '../Service/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'article-root',
  standalone: true,
  imports: [RouterOutlet , 
            MenubarModule ,
            MegaMenuModule , 
            FileUploadModule , 
            CommonModule,
            ListboxModule,
            ScrollPanelModule,
            ButtonModule,
            TabViewModule,
            ToastModule , 
            InputTextareaModule,
            InputTextModule,
            FormsModule , 
            DividerModule , 
            DialogModule , 
            GalleriaModule],
  providers: [MessageService , ArticleService , PropertyService ,     
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TokenService , TokenInterceptor] , 
  templateUrl: './article.componet.html',
  styleUrl: './article.componet.scss' ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Article implements OnInit {
  title = 'Article';
  dialogAddImage : boolean = false;
  dialogAddNewImage : boolean = false
  upload_image: boolean = true;
  uploadedFiles: any[] = [];
  images: any[] = [];
  deleteImageDialogVisivle: boolean = false;
  imagesList : any[] = [];
  selectImage: any = "";
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  constructor(private messageService: MessageService,
              private articleService: ArticleService ,
              private propertyService: PropertyService,
              private deviceService: DeviceDetectorService  ) {

              this.isMobile = this.deviceService.isMobile();
              this.isTablet = this.deviceService.isTablet();
              this.isDesktop = this.deviceService.isDesktop();
              }
  article_title !: string;
  article_content !: string;
  article: ArticleDto = { articleId: 0 , title: "" , content: ""}
  articlesList: any[] = [];
  selectedArticles !: any; 
  articles : ArticleDto[]  = [];
  ngOnInit() {
  }

  preventSpecialCharacters(event: KeyboardEvent) {
    const regex = new RegExp("^[a-zA-Z0-9a-яА-Я\\s.]*$");
    if (!regex.test(event.key)) {
        event.preventDefault();
    }
  }

  createArticle(){
    if(this.article_title!== undefined && this.article_content !== undefined){
      this.article.title = this.article_title;
      this.article.content = this.article_content;
      this.articleService.createArticle(this.article).subscribe({
        next: (response)=>{
          this.messageService.add(
            {
              severity: 'info',
              summary: response.message
            });
        }
      });  
    }
    else{
      this.messageService.add(
        {
          severity: 'error',
          summary: "Полетата не са попълнени!"
        }
      );
    }
  }


  getArticles(){
    this.articleService.getAllArticle().subscribe({
      next: (response)=>{
        this.articlesList = [];
        for(let i=0 ; i<response.length;i++){
          this.articlesList.push({articleId: response[i].articleId})
        }
      }
    });
  }

  getArticleContent(){
    if(this.selectedArticles!== undefined && this.selectedArticles.articleId !== null){
      this.articleService.getArticleById(this.selectedArticles.articleId).subscribe(
        {
          next: (response)=>
          {
            this.article = response;
          }
        });
        this.propertyService.getListofImages("article" , this.selectedArticles.articleId).subscribe({
          next: (response)=>{
            this.images = [];
            for (let i = 0; i < response.length; i++) {
              this.images.push({ 
                 previewImageSrc: "https://k-konsult-server.online:80/K-Konsult/file/Get/images/article/"+this.selectedArticles.articleId+"/"+ response[i], 
                 thumbnailImageSrc:  "https://k-konsult-server.online:80/K-Konsult/file/Get/images/article/"+this.selectedArticles.articleId+"/"+ response[i], 
                 alt: "Description for Image "+i+", title: Title "+i
                }); 
             }
          }
        });
    }
  }

  deleteArticle(){
    if(this.selectedArticles!== undefined && this.selectedArticles.articleId !== null){
      this.articleService.deleteArticle(this.selectedArticles.articleId).subscribe({
        next: (response)=>{
          this.messageService.add(
            {
              severity: 'info',
              summary: response.message
            });
            this.propertyService.deleteFolder("article" ,this.selectedArticles.articleId).subscribe({
              next: (response)=>{
              }
            });
            this.getArticles(); 
        }
      });
    }
  }

  updateArticle(){
    if(this.selectedArticles!== undefined && this.selectedArticles.articleId !== null){
      this.articleService.updateArticle(this.article).subscribe({
        next: (response)=>{
          this.messageService.add(
            {
              severity: 'info',
              summary: response.message
            });
        }
      });
    }
  }

  addPicture(){
    this.dialogAddImage = true
  }

  onUpload(event:UploadEvent) {
  if(this.article_title!== undefined && this.article_title!==""){
    for(let file of event.files) {
        this.uploadedFiles.push(file);
      }
      this.dialogAddNewImage=false;
      this.getArticleContent();
      this.messageService.add({severity: 'info', summary: 'File Uploaded'});
    }else{
      this.dialogAddNewImage=false;
      this.getArticleContent();
    }
  }

  addNewPicture(){
    if(this.selectedArticles!== undefined && this.selectedArticles.articleId!==""){
      this.dialogAddNewImage = true;
    }else{
      this.messageService.add({severity: 'info', summary: 'Имота който се опитвате да качите няма име!', detail: ''});
    }
  }
  displayModal: boolean = false;
  openGalleryModal() {
    this.displayModal = true;
    // Можете да добавите и допълнителна логика, ако е необходимо.
  }


  deleteImage(){
    if(this.selectImage!== undefined && this.selectImage.file !== null && this.selectedArticles.articleId !== undefined){
      this.propertyService.deleteImage("article", this.selectedArticles.articleId  , this.selectImage.file).subscribe({
        next: (response)=>{
          this.getArticleContent();
          this.messageService.add(
            {
              severity: 'info',
              summary: response.message
            });
            this.propertyService.getListofImages( "article", this.selectedArticles.articleId).subscribe({
              next: (response)=>{
                this.imagesList = [];
                for (let i = 0; i < response.length; i++) {
                    this.imagesList.push({file : response[i]})
                 }
              }
            });
        }
      });
    }
    else{
      this.messageService.add(
        {
          severity: 'info',
          summary: "Не е избрана снимка "
        }
      );
    }
  }
  
  deleteImageDialog(){
    
    if(this.selectedArticles.articleId !== undefined){
      this.deleteImageDialogVisivle = true;
      this.propertyService.getListofImages("article" ,this.selectedArticles.articleId).subscribe({
        next: (response)=>{
          this.imagesList = [];
          for (let i = 0; i < response.length; i++) {
              this.imagesList.push({file : response[i]})
           }
        }
      });
    }
  }
  
}
