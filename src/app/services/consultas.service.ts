import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  //urlback="https://localhost:7237/"
  urlback="https://apiCarniceria.somee.com/"

  constructor(private http: HttpClient) { }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');  // Comprueba si existe un token en el almacenamiento local
  }

  getToken(): any {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;  // Convierte la cadena JSON de vuelta a un objeto
  }

  // Método para guardar el token en el inicio de sesión
  setToken(token: any): void {
    localStorage.setItem('token', JSON.stringify(token));  // Convierte el objeto en una cadena JSON antes de guardarlo
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');  // Elimina el token del almacenamiento local
    // console.log('Sesión cerrada y token eliminado.');
  }


  CorreoBienvenida(body:any){
    return this.http.post(`${this.urlback}Email/CorreoBienvenida`,body)
  }

  CorreoPass(body:any){
    return this.http.post(`${this.urlback}Usuario/CodigoRecuperacion`,body)
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
    return this.http.get(`${this.urlback}Rol/ListRoles`)
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


    //Servicios Proveedores
  
    insProveedores(body:any){
      return this.http.post(`${this.urlback}CategoriaProducto/Registrar`,body)
    }
    consProveedores(){
      return this.http.get(`${this.urlback}CategoriaProducto/ListProveedores`)
    }
  
    updateProveedores(body:any){
      return this.http.put(`${this.urlback}CategoriaProducto/Actualizar`,body)
    }



    // Paginas y Paginas x Rol
    consPaginas(){
      return this.http.get(`${this.urlback}RolPagina/ListPaginas`)
    }


    consPaginasRol(body:any){
      return this.http.get(`${this.urlback}RolPagina/ListPaginaRol?id_Rol=${body}`,)
    }

    insPaginasRol(body:any){
      return this.http.post(`${this.urlback}RolPagina/AgregarPaginaRol`,body)
    }

    updaPaginasRol(body:any){
      return this.http.put(`${this.urlback}RolPagina/ActualizarPaginaRol`,body)
    }

    deletePaginasRol(body:any){
      return this.http.delete(`${this.urlback}RolPagina/EliminarPaginaRol?id=${body}`)
    }


    validarCodigo(body:any){
      return this.http.get(`${this.urlback}Usuario/ValidarCodigo?codigo=${body}`,)
    }

    cambioContraseña(body:any){
      return this.http.put(`${this.urlback}Usuario/CambiarContraseña`,body)
    }

    //Estado

    insEstado(body:any){
      return this.http.post(`${this.urlback}CategoriaProducto/NuevaCategoria`,body)
    }
    consEstado(){
      return this.http.get(`${this.urlback}CategoriaProducto/ListCategorias`)
    }
  
    updateEstado(body:any){
      return this.http.put(`${this.urlback}CategoriaProducto/ActualizarCategoria`,body)
    }


    //Productos
    insProductos(body:any){
      return this.http.post(`${this.urlback}CatalogoaProducto/NuevoProducto`,body)
    }
    consProductos(){
      return this.http.get(`${this.urlback}CatalogoaProducto/ListProductos`)
    }
  
    updateProductos(body:any){
      return this.http.put(`${this.urlback}CatalogoaProducto/ActualizarProducto`,body)
    }
  
    deleteProductos(body:any){
      return this.http.put(`${this.urlback}CatalogoaProducto/EliminarProducto`,body)
    }
  

}
