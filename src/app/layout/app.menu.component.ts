import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { ConsultasService } from '../services/consultas.service';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private consulta: ConsultasService) { }

    ngOnInit() {
      var tmp =  this.consulta.getToken()
        console.log(tmp)

        // aca debo de colocar el servicio que traiga los menus segun el rol
            var tmp1 = []
            tmp1.push(
                {
                nombre:'Roles',
                icon: 'pi pi-file',
                routerLink: '/layout/roles'
            },
            {
                nombre:'Usuarios',
                icon: 'pi pi-file',
                routerLink: '/layout/usuarios'
            },
            {
                nombre:'Prueba',
                icon: 'pi pi-file',
                routerLink: '/layout/inicio1'
            },
        )

        if (tmp1.length > 0) {
            this.model = [
                {
                    items: tmp1.map(item => ({
                        label: item.nombre,     // Asegúrate de que 'nombre' venga del backend
                        icon: item.icon,        // Asegúrate de que 'icon' venga del backend
                        routerLink: [item.routerLink]  // Asegúrate de que 'routerLink' venga del backend
                      }))
                },
                {
                    items:[
                        {label: 'Cerrar Sesión',
                        icon: 'pi pi-sign-out',
                        routerLink: ['auth','inicio']
                        }
                    ]
                }
              
            ];
        }
        


      
    }
}
