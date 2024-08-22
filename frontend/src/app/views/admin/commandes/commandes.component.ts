import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit{
  commandes:any=[];
  page:any=1;
  limit:any=2;
  skip:any;
  totalCount:any;
  constructor(private a:MatDialog,private crudService:CrudService,private snackBar:MatSnackBar){}
  ngOnInit(): void {
    this.loadcommandes();
  }
  loadcommandes(){
    if(this.page==1){
      this.skip = 0;
    }else{
      this.skip = (this.page-1)*this.limit;
    }
    const data = {
      'limit' : this.limit,
      'skip': this.skip,
    }
    this.crudService.getCommandes(data).subscribe(
      (res:any)=>{
        this.commandes = res.data;
        console.log(this.commandes);
        
        for(let i=0;i<this.commandes.length;i++){
          this.commandes[i].cart_items = JSON.parse(this.commandes[i].cart_items);
        }
        this.totalCount = res.totalcount;
          
      }
    )
  }
  /*
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
    */
}
