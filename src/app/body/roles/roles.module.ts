import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { StyleClassModule } from 'primeng/styleclass';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { RolesComponent } from './roles.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    StyleClassModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    TabViewModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RolesModule { }
