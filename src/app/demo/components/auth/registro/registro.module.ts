import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { RegistroComponent } from './registro.component';

@NgModule({
  imports: [
    CommonModule,
    RegistroRoutingModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    CheckboxModule,
    CardModule
  ],
  declarations: [RegistroComponent]

})
export class RegistroModule { }
