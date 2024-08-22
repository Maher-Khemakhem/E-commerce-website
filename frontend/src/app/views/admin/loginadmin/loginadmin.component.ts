import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedserviceService } from 'src/app/service/sharedservice.service';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit{
  myForm:any;
  constructor(
    private formBuilder:FormBuilder,
    private httpClient:HttpClient,
    private router:Router,
    private sharedService: SharedserviceService
  ){
  }
  ngOnInit(): void {
      this.myForm = this.formBuilder.group({
        name:['',[Validators.required]],
        password:['',[Validators.required]],
      })
  }

  submit(): void {
    console.log(this.myForm.getRawValue());
    
    //this.sharedService.changeMessage(this.myForm.getRawValue());
    this.httpClient.post('http://localhost:8000/api/loginAdmin',this.myForm.getRawValue(),{withCredentials:true}).subscribe(()=>{
        console.log("mahran");
        this.router.navigate(['admin/dashboard']);
      },(err:any)=>{
        console.log(err);
      }
    )
}
}
