import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedserviceService } from 'src/app/service/sharedservice.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit{
  authenticated:boolean=false;
  @ViewChild('logoutModal', { static: false }) logoutModal!: ElementRef;
  constructor(private sharedService:SharedserviceService,private httpClient:HttpClient,private renderer: Renderer2,private router:Router){}
  ngOnInit(): void {
    this.sharedService.auth$.subscribe(auth => {
      this.authenticated = auth;
    });
    console.log(this.authenticated);
  }
  logout(): void {
    //this.sharedService.setAuthStatus(false);
    
    //this.authenticated = false;
    this.httpClient.post('http://localhost:8000/api/admin/logout', {}, { withCredentials: true }).subscribe(
      () => {
        console.log("heyy");
        this.sharedService.setAuthStatus(false);
        console.log(this.authenticated);
        
        
        this.router.navigate(['admin/login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
 
}
