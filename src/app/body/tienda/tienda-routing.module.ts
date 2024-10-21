import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tienda.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: TiendaComponent, canActivate: [AuthGuard] }
])],
  exports: [RouterModule]
})
export class TiendaRoutingModule { }
