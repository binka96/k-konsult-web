import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root-home',
  standalone: true,
  imports: [RouterOutlet ,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class Home implements OnInit{

  title = 'k-konsult-web-home';
  ngOnInit(){
    
  }
  
}

