import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SharedserviceService } from 'src/app/service/sharedservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [NgbOffcanvasConfig, NgbOffcanvas],
})
export class NavComponent implements OnInit{
  authenticated=false;
  articles:any=[];
  i:number=0;
  constructor(private sharedService:SharedserviceService,private httpClient:HttpClient,private router:Router,config: NgbOffcanvasConfig, private offcanvasService: NgbOffcanvas,private snackBar:MatSnackBar){
    
  }
  /*
  ngOnInit(): void {
      Emitters.authEmitter.subscribe(
        (auth:boolean)=>{
          this.authenticated = auth;
        }
      )
      Emitters.emitterr.subscribe(
        (res:any)=>{
          this.articles[this.i] = res;
          this.i=this.i+1;
        }
      )
      
  }
  
    
  logout(){
    this.authenticated = false;
    this.httpClient.post('http://localhost:8000/api/logout',{},{withCredentials:true}).subscribe(
      ()=>{
        
        console.log(this.authenticated);
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  openEnd(content: any) {
		this.offcanvasService.open(content, { position: 'end' });
    console.log(this.articles);
    //console.log(this.article);
	}

  */
  ngOnInit(): void {
    /*
    this.sharedService.auth$.subscribe(auth => {
      this.authenticated = auth;
    });

    this.sharedService.articles$.subscribe(articles => {
      this.articles[this.i] = articles;
      this.i = articles.length;
    });
    */
    this.sharedService.auth$.subscribe(auth => {
      this.authenticated = auth;
    });

    this.sharedService.clientId$.subscribe(clientId => {
      if (clientId !== null) {
        this.loadArticles(clientId);
      }
    });

    // Load articles from localStorage if available
    //this.loadArticlesFromLocalStorage();
  }
  loadArticles(clientId: number) {
    this.httpClient.get(`http://localhost:8000/api/articles/${clientId}`, { withCredentials: true }).subscribe(
      (res: any) => {
        this.articles = res.articles;
      },
      err => {
        console.log(err);
      }
    );
  }
  /*
  saveArticlesToLocalStorage(): void {
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }

  loadArticlesFromLocalStorage(): void {
    const storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
      this.articles = JSON.parse(storedArticles);
      this.i = this.articles.length;
      this.sharedService.setArticles(this.articles);
    }
  }
  */
  logout(): void {
    this.sharedService.setAuthStatus(false);
    
    this.authenticated = false;
    this.httpClient.post('http://localhost:8000/api/logout', {}, { withCredentials: true }).subscribe(
      () => {
        this.sharedService.setAuthStatus(false);
        this.showErrorSnackbar("Logout successfully");
        console.log(this.authenticated);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openEnd(content: any): void {
    this.offcanvasService.open(content, { position: 'end' });
    console.log(this.articles);
  }
  showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, 
      verticalPosition: 'top', 
      horizontalPosition: 'center',
      panelClass: ['error-snackbar']
    });
  }
}
