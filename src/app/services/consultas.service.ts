import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  urlback="https://localhost:7237/"

  constructor(private http: HttpClient) { }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');  // Comprueba si existe un token en el almacenamiento local
  }

  // Método para guardar el token en el inicio de sesión
  setToken(token: string): void {
    localStorage.setItem('token', token);  // Guarda el token en el almacenamiento local
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');  // Elimina el token al cerrar sesión
  }

  consUsuarios(){
    return this.http.get(`${this.urlback}Usuario/ListUsuarios`)
  }

  InicioSesion(body:any){
    return this.http.post(`${this.urlback}Login/IniciarSesion`,body)
  }

  RegistroUsuario(body:any){
    return this.http.post(`${this.urlback}Usuario/Registrar`,body)
  }


  
}
