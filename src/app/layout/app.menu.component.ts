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
        // console.log(tmp)
        var tmp1 = []
        this.consulta.consPaginasRol(tmp.id_Rol).subscribe(info => {
                // Asegúrate de concatenar los elementos en tmp1 en lugar de hacer push de un array completo
                tmp1 = tmp1.concat(info);  // o tmp1 = [...tmp1, ...info] para concatenar
        
                // Genera el modelo de navegación
                this.model = [
                    {
                        items: tmp1.map(item => ({
                            label: item.nombre,   // Asumiendo que 'nombre' es el campo correcto
                            icon: item.icono,     // Asumiendo que 'icono' es el campo correcto
                            routerLink: [item.url]  // Asegúrate de que 'url' sea parte de los datos
                        }))
                        
                    },
                    
                    {
                        items: [
                            { 
                                label: 'Cerrar Sesión',
                                icon: 'pi pi-sign-out',
                                routerLink: ['auth', 'inicio']
                            }
                        ]
                    }
                ];
        });

      
    }
}
