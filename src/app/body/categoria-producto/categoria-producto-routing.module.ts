import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaProductoComponent } from './categoria-producto.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CategoriaProductoComponent, canActivate: [AuthGuard] }
])],
  exports: [RouterModule]
})
export class CategoriaProductoRoutingModule { }
