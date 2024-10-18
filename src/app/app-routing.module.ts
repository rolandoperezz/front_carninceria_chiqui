import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'auth/inicio', pathMatch: 'full' },
            {
                path: 'layout', component: AppLayoutComponent,
                children: [
                    { path: 'inicio1', loadChildren: () => import('./body/inicio/inicio.module').then(m => m.InicioModule) },
                    { path: 'roles', loadChildren: () => import('./body/roles/roles.module').then(m => m.RolesModule) },
                    { path: 'usuarios', loadChildren: () => import('./body/usuarios/usuarios.module').then(m => m.UsuariosModule) },
                    { path: 'categoria', loadChildren: () => import('./body/categoria-producto/categoria-producto.module').then(m => m.CategoriaProductoModule) },

                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'auth' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
