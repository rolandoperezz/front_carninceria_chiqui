import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },

        { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule) },
        { path: 'inicio', loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule) },
        { path: 'recupera', loadChildren: () => import('./recupera/recupera.module').then(m => m.RecuperaModule) },

        { path: '**', redirectTo: 'inicio' },
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
