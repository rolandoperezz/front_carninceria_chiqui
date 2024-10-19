import { Component } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

moment.locale('es');


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  datosUsuario:any
  fecha:any

  constructor(    private Router : Router,
    private ConsultaService : ConsultasService,
private ActivatedRoute : ActivatedRoute,

    ) {

     }

     ngOnInit(): void {
      // Escucha el evento popstate cuando el usuario navega hacia atrás
      window.addEventListener('popstate', this.handlePopState.bind(this));
  
      if (!this.ConsultaService.isAuthenticated()) {
        // Navega a 'auth/inicio' reemplazando la URL actual
        this.Router.navigate(['auth', 'inicio'], { replaceUrl: true });
      }else{
         this.datosUsuario =  this.ConsultaService.getToken()
      }
     this.fecha=  moment().format('DD-MMMM-YYYY')
    }
  
    ngOnDestroy(): void {
      // Elimina el listener cuando el componente se destruye
      window.removeEventListener('popstate', this.handlePopState.bind(this));
    }
  
    handlePopState(event: any): void {
      console.log("Navegando hacia atrás en el historial.");
      this.ConsultaService.logout();
      console.log("Token eliminado del localStorage.");
      // Navega a 'auth/inicio' reemplazando la URL actual
      this.Router.navigate(['auth', 'inicio'], { replaceUrl: true });
    }
  
    


}
