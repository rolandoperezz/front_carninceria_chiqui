import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { MispedidosComponent } from './mispedidos.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: MispedidosComponent, canActivate: [AuthGuard] }
])],
  exports: [RouterModule]
})
export class MispedidosRoutingModule { }
