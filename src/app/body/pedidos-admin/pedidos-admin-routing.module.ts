import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosAdminComponent } from './pedidos-admin.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: PedidosAdminComponent, canActivate: [AuthGuard] }
])],
  exports: [RouterModule]
})
export class PedidosAdminRoutingModule { }
