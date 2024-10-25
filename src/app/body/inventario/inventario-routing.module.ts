import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { InventarioComponent } from './inventario.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: InventarioComponent, canActivate: [AuthGuard] }
])],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
