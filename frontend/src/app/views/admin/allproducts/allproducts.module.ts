import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllproductsRoutingModule } from './allproducts-routing.module';
import { AllproductsComponent } from './allproducts.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PopUpComponent } from './pop-up/pop-up.component';
import { UpdatePopUpComponent } from './update-pop-up/update-pop-up.component';
import { StatsComponent } from './stats/stats.component';
import { NgbPaginationModule, NgbAlertModule,NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AllproductsComponent,
    PopUpComponent,
    UpdatePopUpComponent,
    StatsComponent
  ],
  imports: [
    CommonModule,
    AllproductsRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    NgxMatFileInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbRatingModule
  ]
})
export class AllproductsModule { }
