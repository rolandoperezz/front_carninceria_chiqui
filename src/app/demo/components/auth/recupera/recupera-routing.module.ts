import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecuperaComponent } from './recupera.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: RecuperaComponent }
])],
  exports: [RouterModule]
})
export class RecuperaRoutingModule { }
