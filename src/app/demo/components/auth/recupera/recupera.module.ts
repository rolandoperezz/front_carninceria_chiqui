import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecuperaRoutingModule } from './recupera-routing.module';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { RecuperaComponent } from './recupera.component';
@NgModule({
  declarations: [RecuperaComponent],
  imports: [
    CommonModule,
    RecuperaRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CardModule,
    CheckboxModule,
    PasswordModule,
    ReactiveFormsModule,
  ]
})
export class RecuperaModule { }
