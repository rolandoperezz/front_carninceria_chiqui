import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConsultasService } from './services/consultas.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: ConsultasService
    , private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);  // Redirige al login si no está autenticado
      window.history.pushState(null, '', '/login');
      return false;
    }
    return true;
  }
}
