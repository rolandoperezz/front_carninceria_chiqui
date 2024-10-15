import { Component } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {




  constructor(    private Router : Router,
    private ConsultaService : ConsultasService,
private ActivatedRoute : ActivatedRoute,

    ) {

     }

     ngOnInit(): void {
      // Escucha el evento popstate cuando el usuario navega hacia atrás
      window.addEventListener('popstate', this.handlePopState.bind(this));
      if (!this.ConsultaService.isAuthenticated()) {
        this.Router.navigate(['auth']);
      }
    }
  
    ngOnDestroy(): void {
      // Elimina el listener cuando el componente se destruye
      window.removeEventListener('popstate', this.handlePopState.bind(this));
    }
  
    // Método que maneja el evento popstate
    handlePopState(event: any): void {
      console.log("Navegando hacia atrás en el historial.");
  
      // Elimina el token del localStorage cuando se detecta el regreso en el historial
      this.ConsultaService.logout();  // Este método elimina el token del localStorage
      console.log("Token eliminado del localStorage.");
  
      // Redirige al usuario al login si no está autenticado
      this.Router.navigateByUrl('auth/inicio').then(() => {
        // Limpiar el historial para que no pueda volver al login
        window.history.pushState(null, '', 'auth/inicio');
      });

    }


}
