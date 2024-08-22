import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService } from 'src/app/service/crud.service';
import { SharedserviceService } from 'src/app/service/sharedservice.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  client_id!: any;
  commandes: any[] = [];
  page: number = 1;
  limit: number = 2;
  skip: number = 0;
  totalCount: number = 0;

  constructor(private sharedService: SharedserviceService, private crudService: CrudService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.sharedService.clientId$.subscribe(clientId => {
      this.client_id = clientId;
      this.loadCommandes();  // Load commandes after clientId is set
    });
  }

  loadCommandes(): void {
    this.skip = (this.page - 1) * this.limit;

    const data = {
      client_id: this.client_id,
      limit: this.limit,
      skip: this.skip,
    };

    this.crudService.getCommande(data).subscribe(
      (res: any) => {

        this.commandes = res.data.filter((commande: any) => commande.delivered === 0);
        console.log(this.commandes);
        //this.commandes = res.data;
        console.log(this.commandes.length);
        this.totalCount=this.commandes.length;
        this.commandes.forEach((commande: any) => {
          commande.cart_items = JSON.parse(commande.cart_items);
          
        });

        //this.totalCount = this.commandes.length;
       
      },
      (error: any) => {
        this.showErrorSnackbar("You have no commands until now");
        return;
      }
    );
  }

  ne7i(commande_id: any): void {
    this.skip = (this.page - 1) * this.limit;

    const data = {
      client_id: this.client_id,
      limit: this.limit,
      skip: this.skip,
    };
    this.crudService.updateCommandes(commande_id, { delivered: 1 }).subscribe(
      (res: any) => {
        this.showErrorSnackbar('Command delivered successfully');
        this.loadCommandes();
      },
      (error: any) => {
        this.showErrorSnackbar('Command not delivered successfully');
      }
    );
    /*
    this.crudService.getCommande(data).subscribe(
      (res: any) => {
        
        this.commandes = res.data.filter((commande: any) => commande.delivered === 0 && commande.id === commande_id);

        this.commandes.forEach((commande: any) => {
          commande.cart_items = JSON.parse(commande.cart_items);
        });

        this.totalCount = res.totalcount;
        console.log(this.commandes);
      },
      (error: any) => {
        console.error('Error fetching commandes', error);
      }
    );
    */
    
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
