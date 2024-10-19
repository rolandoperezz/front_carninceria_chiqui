import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ProveedoresComponent, canActivate: [AuthGuard] }
])],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
