import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { TiendaModule } from './body/tienda/tienda.module';

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
                    { path: 'proveedores', loadChildren: () => import('./body/proveedores/proveedores.module').then(m => m.ProveedoresModule) },
                    { path: 'productos', loadChildren: () => import('./body/productos/productos.module').then(m => m.ProductosModule) },
                    { path: 'tienda', loadChildren: () => import('./body/tienda/tienda.module').then(m => m.TiendaModule) },
                    { path: 'compras', loadChildren: () => import('./body/compras/compras.module').then(m => m.ComprasModule) },
                    { path: 'inventario', loadChildren: () => import('./body/inventario/inventario.module').then(m => m.InventarioModule) },
                    { path: 'mispedidos', loadChildren: () => import('./body/mispedidos/mispedidos.module').then(m => m.MispedidosModule) },
                    { path: 'estado', loadChildren: () => import('./body/estado/estado.module').then(m => m.EstadoModule) },
                    { path: 'pedidos', loadChildren: () => import('./body/pedidos-admin/pedidos-admin.module').then(m => m.PedidosAdminModule) },

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
