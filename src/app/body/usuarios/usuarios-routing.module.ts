import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: UsuariosComponent, canActivate: [AuthGuard] }
])],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
