import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root-partners',
  standalone: true,
  imports: [RouterOutlet ,
  ],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class Partners implements OnInit{

  title = 'k-konsult-web-home';
  ngOnInit(){
    
  }
  
}

