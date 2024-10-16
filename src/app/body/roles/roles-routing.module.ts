import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: RolesComponent, canActivate: [AuthGuard] }
])],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
