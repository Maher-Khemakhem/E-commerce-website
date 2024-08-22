import { Component,Input,OnInit,ElementRef, Renderer2,NgZone, Output, EventEmitter, Inject, Type } from '@angular/core';
import { FormControl, Validators,FormGroup, FormBuilder, MinLengthValidator, ValidationErrors, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CategorieCrudService } from 'src/app/service/categorie-crud.service';
import { TypeCurdService } from 'src/app/service/type-curd.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit{
  @Input() maxRating = 5;
  @Input() SelectedStar=0;
  @Output() dataEmitter = new EventEmitter<boolean>();
  maxRatingArr: any = [];
  previousSelection=0;
  message:boolean = false;
  errormessage:boolean = false;
  myForm:any;
  constructor(private formbuilder:FormBuilder,private renderer: Renderer2, private el: ElementRef,private a:MatDialog,private router:Router,private ngZone:NgZone,private crudService:CrudService,public dialogRef: MatDialogRef<PopUpComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private categorieCrudService:CategorieCrudService,private typeCrudService:TypeCurdService ){
    this.myForm = this.formbuilder.group({
      title:[''],
      price:[''],
      moyenne:[''],
      nbratings:[''],
      description:[''],
      image:[null],
      categorie_id: ['', [Validators.required]],
      type_id: ['', [Validators.required]]
    })
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
  ngOnInit(): void {
      this.maxRatingArr = Array(this.maxRating).fill(0);
  }
  get name(){
    return this.myForm.get('name');
  }
  get description(){
    return this.myForm.get('description');
  }
  get image(){
    return this.myForm.get('image');
  }
  get rating(){
    return this.myForm.get('rating');
  }
  get comments(){
    return this.myForm.get('comments');
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
  
  /*
  onSubmit():any{
    
    const formData = new FormData();
    const data = this.myForm.value;

    formData.append('title', data.title);
    formData.append('moyenne', data.moyenne);
    formData.append('nbratings', data.nbratings);
    formData.append('description', data.description);
    
    if (data.image && data.image instanceof File) {
        formData.append('image', data.image, data.image.name);
    }
    
    formData.append('categorie_id', data.categorie_id);
    formData.append('type_id', data.type_id);
    this.crudService.addArticle(formData)
    .subscribe(()=>{
      console.log('Data added successfully');
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/admin/allproducts').then(() => {
          console.log('Data added successfully');
          
          this.message = true;
          this.data = {message:this.message,errormessage:this.errormessage}
          this.dialogRef.close(this.data);
          //window.location.reload();
          
        });
      },(err:any)=>{
        console.log(err);
        this.errormessage = true;
      })
    })
  }
  */
  categoryError = false;
  typeError = false;
  onSubmit(): void {
    const data = this.myForm.value;
    this.categoryError = false;
    this.typeError = false;
    console.log(data.categorie_id);
    console.log(data.type_id);
    console.log(data.price);
    // Check if categorie_id exists
    this.categorieCrudService.checkCategoryIdExists(data.categorie_id).subscribe(
      

      (categoryExists) => {
        
        console.log(categoryExists);
        if (categoryExists) {
          // Check if type_id exists
          this.typeCrudService.checkTypeIdExists(data.type_id).subscribe(
            (typeExists) => {
              console.log(typeExists);
              if (typeExists) {
                // Proceed with form submission
                const formData = new FormData();
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

                this.crudService.addArticle(formData).subscribe(
                  () => {
                    console.log('Data added successfully');
                    this.ngZone.run(() => {
                      this.router.navigateByUrl('/admin/allproducts').then(() => {
                        this.message = true;
                        this.dialogRef.close({ message: this.message, errormessage: this.errormessage });
                      });
                    });
                  },
                  (err) => {
                    console.log(err);
                    this.errormessage = true;
                  }
                );
              } else {
                this.typeError = true;
              }
            },
            (err) => {
              
              this.typeError = true;
              console.log(this.typeError);
              console.log(err);
            }
          );
        } else {
          console.log(this.categoryError);
          this.categoryError = true;
        }
      },
      (err) => {
        this.categoryError = true;
        console.log(this.categoryError);
        console.log(err);
        
      }
    );
  }  
}
