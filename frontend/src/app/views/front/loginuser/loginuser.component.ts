import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { valueOrDefault } from 'chart.js/dist/helpers/helpers.core';
import { SharedserviceService } from 'src/app/service/sharedservice.service';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent implements OnInit{
  myForm:any;
  constructor(
    private formBuilder:FormBuilder,
    private httpClient:HttpClient,
    private router:Router,
    private sharedService: SharedserviceService,
    private snackBar:MatSnackBar
  ){
  }
  ngOnInit(): void {
      this.myForm = this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]],
      })
  }

  submit(): void {
      console.log(this.myForm.getRawValue());
      
      //this.sharedService.changeMessage(this.myForm.getRawValue());
      this.httpClient.post('http://localhost:8000/api/login',this.myForm.getRawValue(),{withCredentials:true}).subscribe(()=>{
        this.showErrorSnackbar("Welcome");
        this.router.navigate(['/'])
      },(err:any)=>{
        this.showErrorSnackbar("wrong email or password");
      })
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
