import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginuserRoutingModule } from './loginuser-routing.module';
import { LoginuserComponent } from './loginuser.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    LoginuserComponent
  ],
  imports: [
    CommonModule,
    LoginuserRoutingModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    NgxMatFileInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class LoginuserModule { }
