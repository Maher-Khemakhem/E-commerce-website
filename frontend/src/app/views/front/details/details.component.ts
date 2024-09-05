import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { Chart,registerables } from 'chart.js';
import { Emitters } from '../emitters/emitters';
import { EmitterService } from 'src/app/service/emitter.service';
import { forkJoin } from 'rxjs';
import { SharedserviceService } from 'src/app/service/sharedservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
Chart.register(...registerables);
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  article_id:any;
  article:any;
  ratings: any = [];
  articles:any = [];
  one: number = 0;
  two: number = 0;
  three: number = 0;
  four: number = 0;
  five: number = 0;
  chart: any;
  chartt:any;
  @Input() maxRating = 5;
  maxRatingArr: number[] = [];
  previousSelection: number[] = [];
  selectedStars: number[] = [];
  articleIndex:any;
  note:any;
  client_id:any;
  chart2:any;
  constructor(private sharedService:SharedserviceService,private route: ActivatedRoute,private crudService:CrudService,private emitterService: EmitterService,private snackBar:MatSnackBar,private router: Router){
    
  }

  ngOnInit(): void {
    /*
    this.maxRatingArr = Array(this.maxRating).fill(0);
    
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.article_id = +idParam;
        
      } else {
        this.article_id = null;
        
      }
    });
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('articleIndex');
      if (idParam) {
        this.articleIndex = +idParam;
        
      } else {
        this.articleIndex = null;
        
      }
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('client_id');
      if (idParam) {
        this.client_id = +idParam;
        
      } else {
        this.client_id = null;  
      }
    });
    this.crudService.getArticle(this.article_id).subscribe(
      (res)=>{
        this.article = res.data;
        
      },
      (err)=>{
        console.log(err);
      }
    )

    this.crudService.getRating().subscribe(res => {
      this.ratings = res.data;
      this.countRatings();
      this.createChart1();
      this.createChart2();
    });
    this.crudService.getArticles().subscribe(res=>{
      this.articles = res.data;
    })
    console.log('Ratings before initializer:', this.ratings);
    this.initializer();
    */
    this.maxRatingArr = Array(this.maxRating).fill(0);
  
  this.route.paramMap.subscribe(params => {
    const idParam = params.get('id');
    if (idParam) {
      this.article_id = +idParam;
    } else {
      this.article_id = null;
    }
  });
  
  this.route.paramMap.subscribe(params => {
    const idParam = params.get('articleIndex');
    if (idParam) {
      this.articleIndex = +idParam;
    } else {
      this.articleIndex = null;
    }
  });
  

  this.route.paramMap.subscribe(params => {
    const idParam = params.get('client_id');
    if (idParam) {
      this.client_id = +idParam;
    } else {
      this.client_id = null;  
    }
  });
  
  this.crudService.getArticle(this.article_id).subscribe(
    (res) => {
      this.article = res.data;
    },
    (err) => {
      console.log(err);
    }
  );
  
  forkJoin({
    ratings: this.crudService.getRating(),
    articles: this.crudService.getArticles()
  }).subscribe({
    next: (res) => {
      this.ratings = res.ratings.data;
      this.articles = res.articles.data;
      this.countRatings();
      //this.createChart1();
      this.createChart2();
      this.initializer();
    },
    error: (err) => {
      console.log(err);
    }
  });
  
  }
  cli(){
    this.initializer();
  }
  initializeStars() {
    
    this.selectedStars = new Array(this.articles[this.articles.length-1].id+1).fill(0);
    this.previousSelection = new Array(this.articles[this.articles.length-1].id+1).fill(0);
  }

  initializeRating() {
    //this.user_id();
    
    console.log(this.articles.length)
    console.log(this.client_id);
    for (let i = 0; i < this.articles.length; i++) {
      for (let j = 0; j < this.ratings.length; j++) {
        if (this.ratings[j].article_id == this.articles[i].id && this.ratings[j].client_id == this.client_id) {
          this.selectedStars[this.articles[i].id] = this.ratings[j].note;
          this.previousSelection[this.articles[i].id] = this.ratings[j].note;
        }
      }
      console.log(this.selectedStars[this.articles[i].id]);
    }
  }
  countRatings(): void {
    
    for (let i = 0; i < this.ratings.length; i++) {
      if (this.ratings[i].article_id == this.article.id) {
        switch (this.ratings[i].note) {
          case 1:
            this.one++;
            break;
          case 2:
            this.two++;
            break;
          case 3:
            this.three++;
            break;
          case 4:
            this.four++;
            break;
          case 5:
            this.five++;
            break;
        }
      }
    }
    console.log(this.one);
    console.log(this.two);
    console.log(this.three);
    console.log(this.four);
    console.log(this.five);
  }
  c1:any;
  c2:any;
  createChart1(): void {
    const labels = ['One star', 'Two stars', 'Three stars', 'Four stars', 'Five stars'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Ratings Distribution',
        data: [this.one, this.two, this.three, this.four, this.five],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }]
    };

    this.c1 = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    setTimeout(() => {
      const ctx = document.getElementById('MyChart') as HTMLCanvasElement;
      if (ctx) {
        this.chart = new Chart(ctx, this.c1);
      }
    });
  }
  createChart2():void{
    const data = {
      labels: [
        'One star',
        'Two stars',
        'Three stars',
        'Four stars',
        'Five stars'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [this.one, this.two, this.three, this.four, this.five],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'
        ],
        //hoverOffset: 4
      }]
    };
    this.c2 = {
      type: 'doughnut',
      data: data,
    };
    setTimeout(() => {
      const ctx = document.getElementById('Chartt') as HTMLCanvasElement;
      if (ctx) {
        this.chart = new Chart(ctx, this.c2);
      }
    });
  }


  HandleMouseEnter(index: number) {
    
    this.selectedStars[this.article_id] = index + 1;
  }

  HandleMouseLeave() {
    console.log(this.previousSelection[this.article_id]);
    if (this.previousSelection[this.article_id] !== undefined) {
      this.selectedStars[this.article_id] = this.previousSelection[this.article_id];
    } else {
      this.selectedStars[this.article_id] = 0;
    }
  }
  
  initializer(){
    this.initializeStars();
    this.initializeRating();
    console.log(this.previousSelection);
    console.log(this.selectedStars);
  }
  Rating(index: number) {
    
    //this.user_id();
    //console.log(this.client_id);
    if(this.client_id==-1){
      this.showErrorSnackbar("You have to login before doing this operation");
    }
    console.log(this.article.id);
    console.log(this.articleIndex);
    console.log(this.client_id);
    console.log(this.previousSelection[this.article_id]);
    if (this.previousSelection[this.article_id] === 0) {
      this.selectedStars[this.article_id] = index + 1;
      this.previousSelection[this.article_id] = this.selectedStars[this.article_id];

      const formData = new FormData();
      formData.append('note', (index + 1).toString());
      formData.append('article_id', this.article_id.toString());
      formData.append('client_id', this.client_id);

      this.crudService.addRating(formData).subscribe(
        (res: any) => {
          this.showErrorSnackbar("Rating added successfully");
          console.log('Rating added successfully');
          this.ratings.push(res.data);
        },
        (err: any) => {
          console.log(err);
        }
      );
      

    } else {
      this.selectedStars[this.article_id] = index + 1;
      this.previousSelection[this.article_id] = this.selectedStars[this.article_id];

      const formData = new FormData();
      let rate_id = 0;
      console.log(this.ratings.length);
      console.log(this.client_id);
      for (let rating of this.ratings) {
        if (this.article_id == rating.article_id && this.client_id == rating.client_id) {
          rate_id = rating.id;
          break;
        }
      }
      console.log(rate_id);
      formData.append('note', (index + 1).toString());
      formData.append('article_id', this.article_id.toString());
      formData.append('client_id', this.client_id);

      this.crudService.updateRating(rate_id, formData).subscribe(
        () => {
          this.showErrorSnackbar("Rating updated successfully");
          
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
      if (this.article_id == rating.article_id && this.client_id == rating.client_id) {
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
  Add(){
    const b = {
      'client_id': this.client_id,
      'article_id':this.article_id,
      'title': this.article.title,
      'price': this.article.price,
      'quantity': 1,
      'image': this.article.image,
    };
    if(this.client_id==-1){
      this.showErrorSnackbar("You have to login before doing this operation");
    }else{
      this.crudService.addToCart(b).subscribe({
        next: () => {
          this.showErrorSnackbar("item added to cart successfully");
          
        },
        error: (err) => {
          this.showErrorSnackbar("Item already added");
        }
      });
        
      
      this.sharedService.setArticles(this.article);
    }
    
    //Emitters.emitterr.emit(this.article);
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
