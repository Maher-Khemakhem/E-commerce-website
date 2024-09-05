import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategorieCrudService } from 'src/app/service/categorie-crud.service';
import { CreatemodalComponent } from './createmodal/createmodal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  Categories:any=[];
  constructor(private a:MatDialog,private categorieCrudService:CategorieCrudService,private snackBar:MatSnackBar){

  }

  ngOnInit(): void {
      this.loadCategories();
  }

  loadCategories(){
    this.categorieCrudService.getCategories().subscribe((res)=>{
      this.Categories = res.data;
    })
  }

  delete(id:any,i:any){
    console.log(id);
    this.categorieCrudService.deleteCategorie(id).subscribe(res=>{
      this.showErrorSnackbar("Category deleted successfully");
      this.Categories.splice(i,1);
      //this.showErrorSnackbar ('Categorie Deleted successfully');
    })
  }
  errorMessage:boolean=false;
  /*
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
          this.loadCategories();
        }
    })
  }
    */

  openModel(){
    const dial = this.a.open(CreatemodalComponent,{
      width:'40%',
      height:'60%',
      data:{message:false,errormessage:false},
    });
    dial.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.errorMessage = true;
        //this.showAlert('Article added successfully', 'success');
        this.showErrorSnackbar ('Article Added successfully');
        this.loadCategories();
      }
    });
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
