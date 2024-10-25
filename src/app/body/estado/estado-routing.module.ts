import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadoComponent } from './estado.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: EstadoComponent, canActivate: [AuthGuard] }
])],
  exports: [RouterModule]
})
export class EstadoRoutingModule { }
