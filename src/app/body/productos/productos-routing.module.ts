import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ProductosComponent, canActivate: [AuthGuard] }
])],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
