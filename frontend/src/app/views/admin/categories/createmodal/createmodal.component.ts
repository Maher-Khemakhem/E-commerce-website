import { Component, ElementRef, Inject, NgZone, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategorieCrudService } from 'src/app/service/categorie-crud.service';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-createmodal',
  templateUrl: './createmodal.component.html',
  styleUrls: ['./createmodal.component.css']
})
export class CreatemodalComponent {
  
  maxRatingArr: any = [];
  previousSelection=0;
  message:boolean = false;
  errormessage:boolean = false;
  myForm:any;
  constructor(private formbuilder:FormBuilder,private renderer: Renderer2, private el: ElementRef,private a:MatDialog,private router:Router,private ngZone:NgZone,private crudService:CrudService,public dialogRef: MatDialogRef<CreatemodalComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private categorieCrudService:CategorieCrudService ){
    this.myForm = this.formbuilder.group({
      
      name:[''],
      description:[''],
    })
  }
  closeModel() {
    const ss = this.a.closeAll();
  }

  onSubmit():any{
    
    const formData = new FormData();
    const data = this.myForm.value;

    formData.append('name', data.name);
    formData.append('description', data.description);
    
    
    this.categorieCrudService.addCategorie(formData)
    .subscribe(()=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/admin/categories').then(() => {
          console.log('Data added successfully');
          //this.message = true;
          //this.data = {message:this.message,errormessage:this.errormessage}
          this.dialogRef.close(this.data);
          //window.location.reload();
          
        });
      },(err:any)=>{
        console.log(err);
        this.errormessage = true;
      })
    })
  }
}
