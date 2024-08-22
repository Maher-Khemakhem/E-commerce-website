import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-pop-up',
  templateUrl: './update-pop-up.component.html',
  styleUrls: ['./update-pop-up.component.css']
})
export class UpdatePopUpComponent implements OnInit{
  myForm:any;
  getId:any;
  @Input() maxRating = 5;
  @Input() SelectedStar=0;
  maxRatingArr: any = [];
  previousSelection=0;
  constructor(private a:MatDialog,private formbuilder:FormBuilder,private crudService:CrudService,private router:Router,private ngZone:NgZone,private activateRoute:ActivatedRoute,public dialogRef: MatDialogRef<UpdatePopUpComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
    this.getId = data.article_id;
    console.log(this.getId);
    
    this.crudService.getArticle(this.getId).subscribe(res=>{
      console.log(res.data);
      this.myForm.setValue({
        title:res.data['title'],
        price:res.data['price'],
        moyenne:res.data['moyenne'],
        nbratings:res.data['nbratings'],
        description:res.data['description'],
        image:res.data['image'],
        categorie_id:res.data['categorie_id'],
        type_id:res.data['type_id'],
      })
      this.imageUrl = `http://127.0.0.1:8000/api/images/${res.data['image']}`
    });
    
    
    this.myForm = this.formbuilder.group({
      title:[''],
      price:[''],
      moyenne:[''],
      nbratings:[''],
      description:[''],
      image:[null],
      categorie_id:[''],
      type_id:[''],
    })

  }
  
  ngOnInit(): void {
       
      
    
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }
  HandleMouseEnter(index:number){
    this.SelectedStar = index+1;
  }
  HandleMouseLeave(){
    if(this.previousSelection!==0){
      this.SelectedStar = this.previousSelection;
    }else{
      this.SelectedStar=0;
    }
  }
  Rating(index:number){
    this.SelectedStar=index+1;
    this.previousSelection=this.SelectedStar;
  }
  closeModel() {
    const ss = this.a.closeAll();
  }
  srcResult: ArrayBuffer | string | null = null;
  imageUrl: ArrayBuffer | string | null = null;
  fileName:string|null=null;

  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      this.myForm.patchValue({
        image: file
      });
      console.log(this.myForm.value);
      this.myForm.get('image')?.updateValueAndValidity();
  
      // Optionally, convert file to base64 for preview
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const arrayBuffer = reader.result as ArrayBuffer;
        this.convertArrayBufferToBase64(arrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    }
  }
  convertArrayBufferToBase64(arrayBuffer: ArrayBuffer): void {
    const binary = [];
    const bytes = new Uint8Array(arrayBuffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary.push(String.fromCharCode(bytes[i]));
    }
    const base64String = window.btoa(binary.join(''));
    this.imageUrl = 'data:image/jpeg;base64,' + base64String;
  }
  onUpdate():any{
    const formData = new FormData();
    const data = this.myForm.value;

    formData.append('title', data.title);
    formData.append('price',data.price);
    formData.append('moyenne', data.moyenne);
    formData.append('nbratings', data.nbratings);
    formData.append('description', data.description);
    
    if (data.image && data.image instanceof File) {
        formData.append('image', data.image, data.image.name);
    }
    
    formData.append('categorie_id', data.categorie_id);
    formData.append('type_id', data.type_id);
    this.crudService.updateArticle(this.getId,formData)
    .subscribe(()=>{
      console.log('Data updated successfully');
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/admin/allproducts').then(() => {
          this.data = {err:true};
          this.dialogRef.close(this.data); // Close the modal
          //window.location.reload(); // Refresh the page
        });
      },(err:any)=>{
        console.log(err);
      })
    })
  }
}
