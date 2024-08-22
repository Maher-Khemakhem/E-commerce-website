import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { CrudService } from 'src/app/service/crud.service';
import { SharedserviceService } from 'src/app/service/sharedservice.service';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  articles:any=[];
  client_id!:any;
  total_price:number=0;
  authenticated:boolean=false;
  selectedPaymentMethod: string = '';
  myForm: FormGroup;
  constructor(private sharedService:SharedserviceService,private crudService:CrudService,private router:Router,private formBuilder:FormBuilder,private snackBar:MatSnackBar){
    this.myForm = this.formBuilder.group({
      card: ['',[Validators.required]],
      nameOnCard: ['',[Validators.required]],
      cardNumber: ['',[Validators.required]]
    });
  }
  /*
  ngOnInit(): void {
    this.sharedService.auth$.subscribe(auth => {
      this.authenticated = auth;
    });
    console.log(this.authenticated);
    //this.client_id = this.sharedService.getClientId();
    this.sharedService.articles$.subscribe(article => {
      this.client_id = article.id;
      console.log(this.client_id);
    });
    console.log(this.client_id);
    const data = {
      'client_id':this.client_id,
    }
    this.crudService.getCart(data).subscribe(
      (res:any)=>{
        this.articles = res.data;
        console.log(this.articles);
      }
    );
  }
    */
  ngOnInit(): void {
    this.sharedService.auth$.subscribe(auth => {
      this.authenticated = auth;
    });

    this.sharedService.clientId$.subscribe(clientId => {
      this.client_id = clientId;
      if (this.client_id !== null) {
        this.loadCart(this.client_id);
      }
    });
    const storedTotalPrice = localStorage.getItem('total_price');
    if (storedTotalPrice) {
      this.total_price = parseFloat(storedTotalPrice);
    }
  }

  loadCart(clientId: number) {
    const data = { 'client_id': clientId };
    console.log(clientId);
    this.crudService.getCart(data).subscribe(
      (res: any) => {
        
        this.articles = res.data;
      
        console.log(this.articles);
        this.total_price = 0; // Reset total price
        for (let i = 0; i < this.articles.length; i++) {
          this.total_price += this.articles[i].price * this.articles[i].quantity;
        }
        localStorage.setItem('total_price', this.total_price.toString());
      },
      err => {
        console.log(err);
      }
    );
  }

    /*
    this.crudService.getArtic(requestObj).subscribe(res => {
      this.articles = res.data;
      this.totalCount = res.totalcount;
      //this.initializeStars();
    });
    */
  
  nakas(article_id:any){
    for(let i=0;i<this.articles.length;i++){
      if(this.articles[i].id==article_id){
        if(this.articles[i].quantity==1){
          this.crudService.deleteFromCart(article_id).subscribe(
            ()=>{
              this.showErrorSnackbar("item deleted from cart");
              this.total_price -= this.articles[i].price;
              localStorage.setItem('total_price', this.total_price.toString());
              this.articles = this.articles.filter((article: { id: any; }) => article.id !== article_id);
            }
          );
        }else{
          const data = {
            'client_id':this.client_id,
            'article_id':this.articles[i].article_id,
            'title':this.articles[i].title,
            'price':this.articles[i].price,
            'quantity':this.articles[i].quantity-1,
            'image':this.articles[i].image,
          }
          this.crudService.updateCart(article_id,data).subscribe(
            ()=>{
              this.showErrorSnackbar("Item deleted successfully from cart");
              this.articles[i].quantity -= 1;
              this.total_price -= this.articles[i].price;
              localStorage.setItem('total_price', this.total_price.toString());
            } 
          );
        }
      }
    }
  }
  zid(article_id:any){
    for(let i=0;i<this.articles.length;i++){
      if(this.articles[i].id==article_id){
        
          const data = {
            'client_id':this.client_id,
            'article_id':this.articles[i].article_id,
            'title':this.articles[i].title,
            'price':this.articles[i].price,
            'quantity':this.articles[i].quantity+1,
            'image':this.articles[i].image,
          }
          this.crudService.updateCart(article_id,data).subscribe(
            ()=>{
              this.showErrorSnackbar("Item added successfully");
              this.articles[i].quantity += 1;
              this.total_price += this.articles[i].price;
              localStorage.setItem('total_price', this.total_price.toString());
            } 
          );
        }
      
    }
  }
  ne7i(article_id:any){
    for(let i=0;i<this.articles.length;i++){
      if(this.articles[i].id==article_id){
      
          this.crudService.deleteFromCart(article_id).subscribe(
            ()=>{
              this.showErrorSnackbar("item deleted from cart");
              
              this.total_price -= (this.articles[i].price*this.articles[i].quantity);
              localStorage.setItem('total_price', this.total_price.toString());
              this.articles = this.articles.filter((article: { id: any; }) => article.id !== article_id);
            }
          );
        
      }
    }
  }
  /*
  onPaymentMethodChange(event: any): void {
    this.selectedPaymentMethod = event.target.value;
    if (this.selectedPaymentMethod === 'Cash') {
      // Add your custom logic for Cash payment method here
      console.log('Cash payment selected');
    } else if (this.selectedPaymentMethod === 'Credit card') {
      // Add your custom logic for Credit card payment method here
      console.log('Credit card payment selected');
    }
  }
  */
  validate(){
    
    
  }
  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const data = this.myForm.value;
    if(this.articles.length==0){
      this.showErrorSnackbar("you have to add at least one article");
    }else{
      const b = {
        'client_id':this.client_id,
        'cart_items':JSON.stringify(this.articles),
        'card_type':data.card,
        'card_name':data.nameOnCard,
        'card_number':data.cardNumber,
        'total_price':this.total_price,
      }
      console.log(this.total_price);
      this.crudService.addCommandes(b).subscribe(
        ()=>{
          this.showErrorSnackbar("Command added successfully");
          
          for(let i=0;i<this.articles.length;i++){
            this.crudService.deleteFromCart(this.articles[i].id).subscribe(
              ()=>{
                console.log("item deleted from cart");
                this.total_price = 0;
                localStorage.setItem('total_price', this.total_price.toString());
                this.articles = [];
              }
            );
          }

          this.router.navigate(['/commandes']);
        },
        (err:any)=>{
          console.log(err);
        }
      )
        
    }
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
