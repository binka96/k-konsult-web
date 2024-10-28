import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-root-contact',
  standalone: true,
  imports: [RouterOutlet ,CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class Contact implements OnInit{

  title = 'k-konsult-web-home';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  constructor( private deviceService: DeviceDetectorService)
{
this.isMobile = this.deviceService.isMobile();
this.isTablet = this.deviceService.isTablet();
this.isDesktop = this.deviceService.isDesktop();
}

  ngOnInit(){
    
  }
  
}

