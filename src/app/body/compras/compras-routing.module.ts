import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { ComprasComponent } from './compras.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ComprasComponent, canActivate: [AuthGuard] }
])],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
