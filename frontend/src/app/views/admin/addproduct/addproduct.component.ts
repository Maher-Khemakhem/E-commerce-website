import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  constructor(private a:MatDialog){

  }

  openModel(){
    const dial = this.a.open(PopUpComponent,{
      width:'55%',
      height:'75%',
    })
    
  }

  
}
