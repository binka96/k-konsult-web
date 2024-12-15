import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-root-partners',
  standalone: true,
  imports: [RouterOutlet ,
            CommonModule ,
            RouterLink,
            RouterLinkActive,
  ],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class Partners implements OnInit{

  title = 'k-konsult-web-home';

  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  constructor( private deviceService: DeviceDetectorService  ) {

              this.isMobile = this.deviceService.isMobile();
              this.isTablet = this.deviceService.isTablet();
              this.isDesktop = this.deviceService.isDesktop();
              }
  ngOnInit(){
    
  }
  
}

