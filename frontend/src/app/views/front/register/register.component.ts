import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  myForm:any;
  constructor(
    private formBuilder:FormBuilder,
    private httpClient:HttpClient,
    private router:Router,
    private snackBar:MatSnackBar
  ){
  }
  ngOnInit(): void {
      this.myForm = this.formBuilder.group({
        name:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]],
      })
  }

  submit(): void {
      console.log(this.myForm.getRawValue());
      this.httpClient.post('http://localhost:8000/api/register',this.myForm.getRawValue()).subscribe(()=>{
        this.showErrorSnackbar("You have registered successfully");
        this.router.navigate(['/login'])
      },
      )
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
