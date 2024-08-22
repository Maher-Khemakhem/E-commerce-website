import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, NgZone, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { Emitters } from '../emitters/emitters';
import { SharedserviceService } from 'src/app/service/sharedservice.service';
import { EmitterService } from 'src/app/service/emitter.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  users: any[] = [];
  categories: any[] = [];
  types: any[] = [];
  clients: any[] = [];
  ratings: any[] = [];
  articles: any[] = [];
  myForm: FormGroup;
  seen: boolean = false;
  @Input() maxRating = 5;
  maxRatingArr: number[] = [];
  previousSelection: number[] = [];
  selectedStars: number[] = [];
  message: string = "You are not logged in";
  authenticated = false;
  obj: any;
  email: any;
  client_id: any;
  page:any=1;
  limit:any=6;
  skip:any;
  totalCount:any;
  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private router: Router,
    private httpClient: HttpClient,
    private sharedService: SharedserviceService,
    private emitterService:EmitterService
  ) {
    this.myForm = this.formBuilder.group({
      type_id: [''],
      categorie_id: [''],
      client_id: ['']
    });
    
  }
  
  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
    this.checkAuthentication();
    this.initializeData();
    
    
  }
  /*
  initializeData() {
    
    this.crudService.getCategories().subscribe(res => {
      this.categories = res.data;
    });

    this.crudService.getTypes().subscribe(res => {
      this.types = res.data;
    });

    this.crudService.getArticles().subscribe(res => {
      this.articles = res.data;
      this.initializeStars();
    });

    this.crudService.getRating().subscribe(res => {
      this.ratings = res.data;
      
    });

    
  }
  */

  ress:any;
  checkAuthentication() {
    this.httpClient.get('http://localhost:8000/api/user', { withCredentials: true }).subscribe(
      (res: any) => {
        this.authenticated = true;
        this.ress = res;
        
        this.sharedService.setAuthStatus(true);
        this.sharedService.setClientId(this.ress.id)
        //console.log(this.sharedService.getAuthStatus());
        console.log(this.ress);
        //this.sharedService.setArticle(this.ress);
        //this.sharedService.setClientId(this.ress.id);
        //console.log(this.sharedService.getClientId());
        //Emitters.emitterr.emit(this.ress);
        
        //console.log(this.authenticated);
        /*
        this.crudService.getArticles().subscribe(
          res=>{
            this.articles = res.data;
          }
        )
        */
        //this.message = `Hi ${res.name}`;
        //Emitters.authEmitter.emit(true);
      },
      err => {
        //this.message = "You are not logged in";
        //Emitters.authEmitter.emit(false);
        this.sharedService.setAuthStatus(false);
      }
    );
  }

  ariaValueText = (current: number) => `${current} out of 5`;
  initializearticles(){
    
    if(this.page==1){
      this.skip = 0;
    }else{
      this.skip = (this.page-1)*this.limit;
    }
    var requestObj = {
      'limit' : this.limit,
      'skip': this.skip,
    }
    console.log(requestObj);
    this.crudService.getArtic(requestObj).subscribe(res => {
      this.articles = res.data;
      this.totalCount = res.totalcount;
      //this.initializeStars();
    });
  }
  initializeData() {
    forkJoin({
      categories: this.crudService.getCategories(),
      types: this.crudService.getTypes(),
      articles: this.crudService.getArticles(),
      ratings: this.crudService.getRating()
    }).subscribe({
      next: (res) => {
        this.categories = res.categories.data;
        this.types = res.types.data;
        this.articles = res.articles.data;
        this.initializearticles();
        this.ratings = res.ratings.data;
        
        console.log(this.articles.length)
        for(let i=0;i<=this.articles[this.articles.length-1].id;i++){
          this.selectedStars[this.articles[i].id] = this.articles[i].moyenne;
        }
        console.log('Data fetched successfully');
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }
  
  
  /*
  user_id() {
    this.sharedService.currentMessage.subscribe(message => {
      console.log(message);
      this.obj = message;
      this.email = this.obj.email;
      console.log(this.email);
      for (let user of this.users) {
        if (user.email === this.email) {
          this.client_id = user.id;
          break;
        }
      }
    });
  }
  */
  initializeStars() {
    console.log(this.articles[this.articles.length-1].id+1)
    this.selectedStars = new Array(this.articles[this.articles.length-1].id+1).fill(0);
    this.previousSelection = new Array(this.articles[this.articles.length-1].id+1).fill(0);
  }

  initializeRating() {
    //this.user_id();
    
    console.log(this.articles.length)
    console.log(this.ress.id);
    for (let i = 0; i < this.articles.length; i++) {
      for (let j = 0; j < this.ratings.length; j++) {
        if (this.ratings[j].article_id == this.articles[i].id && this.ratings[j].client_id == this.ress.id) {
          this.selectedStars[this.articles[i].id] = this.ratings[j].note;
          this.previousSelection[this.articles[i].id] = this.ratings[j].note;
        }
      }
      console.log(this.selectedStars[i]);
    }
  }

  HandleMouseEnter(index: number, articleIndex: number) {
    this.selectedStars[articleIndex] = index + 1;
  }

  HandleMouseLeave(articleIndex: number) {
    if (this.previousSelection[articleIndex] !== undefined) {
      this.selectedStars[articleIndex] = this.previousSelection[articleIndex];
    } else {
      this.selectedStars[articleIndex] = 0;
    }
  }

  Rating(index: number, articleIndex: number, article_id: number) {
    //this.user_id();
    //console.log(this.client_id);

    this.crudService.getRating().subscribe(res => {
      this.ratings = res.data;
    });
    console.log(articleIndex);
    console.log(this.previousSelection[articleIndex]);
    if (this.previousSelection[articleIndex] === 0) {
      this.selectedStars[articleIndex] = index + 1;
      this.previousSelection[articleIndex] = this.selectedStars[articleIndex];

      const formData = new FormData();
      formData.append('note', (index + 1).toString());
      formData.append('article_id', article_id.toString());
      formData.append('client_id', this.ress.id);

      this.crudService.addRating(formData).subscribe(
        (res: any) => {
          console.log('Rating added successfully');
          this.ratings.push(res.data);
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      this.selectedStars[articleIndex] = index + 1;
      this.previousSelection[articleIndex] = this.selectedStars[articleIndex];

      const formData = new FormData();
      let rate_id = 0;
      for (let rating of this.ratings) {
        if (article_id == rating.article_id && this.ress.id == rating.client_id) {
          rate_id = rating.id;
          break;
        }
      }

      formData.append('note', (index + 1).toString());
      formData.append('article_id', article_id.toString());
      formData.append('client_id', this.ress.id);

      this.crudService.updateRating(rate_id, formData).subscribe(
        () => {
          console.log('Rating updated successfully');
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  zeroize(index: number, article_id: any) {
    //this.user_id();
    

    
    let rate_id = 0;
    for (let rating of this.ratings) {
      if (article_id == rating.article_id && this.ress.id == rating.client_id) {
        rate_id = rating.id;
        break;
      }
    }
    console.log("rate_id=", rate_id);
    this.crudService.deleteRating(rate_id).subscribe(
      () => {
        console.log('Rating deleted successfully');
        this.selectedStars[index] = 0;
        this.previousSelection[index] = 0;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    const formData = new FormData();
    const data = this.myForm.value;
    if(this.page==1){
      this.skip = 0;
    }else{
      this.skip = (this.page-1)*this.limit;
    }
    console.log(data.type_id);
    formData.append('type_id', data.type_id);
    formData.append('categorie_id', data.categorie_id);
    formData.append('limit',this.limit);
    formData.append('skip',this.skip);
    this.crudService.getArts(formData).subscribe(
      (res) => {
        this.seen = true;
        this.articles = res.articles;
        this.totalCount = res.totalcount;
        console.log(this.articles);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  
  goDetails(id:number,articleIndex:number){
    /*
    this.emitterService.emitArticleIndex(articleIndex);
    this.emitterService.emitArticleIndex(this.ress.id);
    /*
    Emitters.emitterr.emit(articleIndex);
    console.log(this.ress.id);
    Emitters.emitterr.emit(this.ress.id);
    */
    
    this.router.navigate(['/details', id,articleIndex,this.ress.id]);
  }


  
}
