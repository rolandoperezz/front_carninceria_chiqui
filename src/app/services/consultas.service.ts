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

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para guardar el token en el inicio de sesión
  setToken(token: string): void {
    localStorage.setItem('token', token);  // Guarda el token en el almacenamiento local
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');  // Elimina el token del almacenamiento local
    // console.log('Sesión cerrada y token eliminado.');
  }

//Servicios para usuarios
  RegistroUsuario(body:any){
    return this.http.post(`${this.urlback}Usuario/Registrar`,body)
  }
  consUsuarios(){
    return this.http.get(`${this.urlback}Usuario/ListUsuarios`)
  }

  updateUsuarios(body:any){
    return this.http.put(`${this.urlback}Usuario/Actualizar`,body)
  }

  deleteUsuarios(body:any){
    return this.http.put(`${this.urlback}Usuario/Eliminar`,body)
  }


  InicioSesion(body:any){
    return this.http.post(`${this.urlback}Login/IniciarSesion`,body)
  }



  //Servicios para roles

  insRoles(body:any){
    return this.http.post(`${this.urlback}Rol/NuevoRol`,body)
  }
  consRoles(){
    return this.http.get(`${this.urlback}Rol/ListRol`)
  }

  updateRoles(body:any){
    return this.http.put(`${this.urlback}Rol/ActualizarRol`,body)
  }

  deleteRoles(body:any){
    return this.http.put(`${this.urlback}Rol/EliminarRol`,body)
  }


    //Servicios para categorias de productos

    insCategorias(body:any){
      return this.http.post(`${this.urlback}CategoriaProducto/NuevaCategoria`,body)
    }
    consCategorias(){
      return this.http.get(`${this.urlback}CategoriaProducto/ListCategorias`)
    }
  
    updateCategorias(body:any){
      return this.http.put(`${this.urlback}CategoriaProducto/ActualizarCategoria`,body)
    }
  





  
}
