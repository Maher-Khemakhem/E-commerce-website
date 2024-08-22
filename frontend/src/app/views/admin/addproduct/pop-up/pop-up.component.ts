import { Component,Input,OnInit,ElementRef, Renderer2,NgZone } from '@angular/core';
import { FormControl, Validators,FormGroup, FormBuilder, MinLengthValidator } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit{
  @Input() maxRating = 5;
  @Input() SelectedStar=0;
  maxRatingArr: any = [];
  previousSelection=0;
  
  myForm:any;
  constructor(private formbuilder:FormBuilder,private renderer: Renderer2, private el: ElementRef,private a:MatDialog,private router:Router,private ngZone:NgZone,private crudService:CrudService ){
    this.myForm = this.formbuilder.group({
      title:[''],
      moyenne:[''],
      nbratings:[''],
      description:[''],
      image:[null],
      categorie_id:[''],
      type_id:[''],
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

  /*
  onFileSelected() {
    const input: any = document.querySelector('#file');
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      this.myForm.patchValue({
        image:file
      });
      this.myForm.get('image').updateValueAndValidity();
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const arrayBuffer = reader.result as ArrayBuffer;
          this.convertArrayBufferToBase64(arrayBuffer); 
        };
        reader.readAsArrayBuffer(file);
      }
    }
  }
  */
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
        this.router.navigateByUrl('/admin/allproducts');
      },(err:any)=>{
        console.log(err);
      })
    })
  }
  
}
