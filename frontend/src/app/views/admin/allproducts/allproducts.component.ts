import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { CrudService } from 'src/app/service/crud.service';
import { UpdatePopUpComponent } from './update-pop-up/update-pop-up.component';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatsComponent } from './stats/stats.component';
@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit{
  Articles:any=[];
  constructor(private a:MatDialog,private crudService:CrudService,private snackBar:MatSnackBar){}
  imageSrc!: string;
  imageLoaded = false;
  receivedData!: any;
  alertMessage: string = '';
  alertType: string = '';
  errorMessage:boolean=false;
  page:any=1;
  limit:any=6;
  skip:any;
  totalCount:any;
  ngOnInit(): void {
      
      this.loadArticles();
        
  }
  
  loadArticles(): void {
    if(this.page==1){
      this.skip = 0;
    }else{
      this.skip = (this.page-1)*this.limit;
    }
    var requestObj = {
      'limit' : this.limit,
      'skip': this.skip,
    }
    this.crudService.getArtic(requestObj).subscribe(res => {
      console.log(res);
      this.Articles = res.data;
      this.totalCount = res.totalcount;
    });
    
  }

  delete(id:any,i:any){
    console.log(id);
    this.crudService.deleteArticle(id).subscribe(res=>{
      this.Articles.splice(i,1);
      this.showErrorSnackbar ('Article Deleted successfully');
    })
  }

  openModel(){
    const dial = this.a.open(PopUpComponent,{
      width:'55%',
      height:'75%',
      data:{message:false,errormessage:false},
    });
    dial.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.errorMessage = true;
        //this.showAlert('Article added successfully', 'success');
        this.showErrorSnackbar ('Article Updated successfully');
        this.loadArticles();
      }
    });
  }
  err!:boolean;
  openUpdate(id:any){
    const modal = this.a.open(UpdatePopUpComponent,{
      width:'55%',
      height:'75%',
      data:{article_id:id,err:false}
    });
    modal.afterClosed().subscribe((res)=>{
        if(res){
          this.errorMessage = true;
          //this.showAlert('Article Updated successfully', 'success');
          this.showErrorSnackbar ('Article Updated successfully');
          this.loadArticles();
        }
        
      
    })
  }
   
  stats(article_id:number){
    const modal = this.a.open(StatsComponent,{
      width:'90%',
      height:'90%',
      data:{article_id:article_id}
    });
  }
  
  showAlert(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
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
