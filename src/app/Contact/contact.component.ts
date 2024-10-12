import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root-contact',
  standalone: true,
  imports: [RouterOutlet ,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class Contact implements OnInit{

  title = 'k-konsult-web-home';
  ngOnInit(){
    
  }
  
}

