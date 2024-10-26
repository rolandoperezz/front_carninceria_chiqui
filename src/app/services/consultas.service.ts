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
      return this.http.post(`${this.urlback}Proveedor/Registrar`,body)
    }
    consProveedores(){
      return this.http.get(`${this.urlback}Proveedor/ListProveedores`)
    }
  
    updateProveedores(body:any){
      return this.http.put(`${this.urlback}Proveedor/Actualizar`,body)
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
      return this.http.post(`${this.urlback}Estado/NuevoEstado`,body)
    }
    consEstado(){
      return this.http.get(`${this.urlback}Estado/ListEstados`)
    }
  
    updateEstado(body:any){
      return this.http.put(`${this.urlback}Estado/ActualizarRol`,body)
    }


    //Productos
    insProductos(body:any){
      return this.http.post(`${this.urlback}CatalogoProducto/NuevoProducto`,body)
    }
    consProductos(){
      return this.http.get(`${this.urlback}CatalogoProducto/ListProductos`)
    }
  
    updateProductos(body:any){
      return this.http.put(`${this.urlback}CatalogoProducto/ActualizarProducto`,body)
    }
  

    deleteProductos(body:any){
      return this.http.delete(`${this.urlback}CatalogoProducto/EliminarProducto?id=${body}`)
    }


    //Orden Compra Enca
    insCompraEnca(body:any){
      return this.http.post(`${this.urlback}OrdenCompra/NuevaOrdenCompra`,body)
    }
    consCompraEnca(){
      return this.http.get(`${this.urlback}OrdenCompra/ListOrdenes`)
    }
  
    updateCompraEnca(body:any){
      return this.http.put(`${this.urlback}OrdenCompra/ActualizarOrdenCompra`,body)
    }
  
    deleteCompraEnca(body:any){
      return this.http.delete(`${this.urlback}OrdenCompra/EliminarOrdenCompra?id=${body}`)
    }

    //Orden Compra Deta
    insCompraDeta(body:any){
      return this.http.post(`${this.urlback}OrdenDetalle/NuevaOrdenDetalle`,body)
    }

    consCompraDeta(body:any){
      return this.http.get(`${this.urlback}OrdenDetalle/ListDetalle?id=${body}`)
    }
  
    updateCompraDeta(body:any){
      return this.http.put(`${this.urlback}OrdenDetalle/ActualizarOrdenDetalle`,body)
    }
  

    deleteCompraDeta(body:any){
      return this.http.delete(`${this.urlback}OrdenDetalle/EliminarOrdenDetalle?id=${body}`)
    }


    //Inventario
    consInventario(){
      return this.http.get(`${this.urlback}InventarioProducto/ListInventarioC`)
    }
    updateInventario(body:any){
      return this.http.put(`${this.urlback}InventarioProducto/ActualizarInventario`,body)
    }


    //Tienda
    consTienda(){
      return this.http.get(`${this.urlback}ListaProductos/Listar`)
    }


    //Pedido Enca
    insPedidoEnca(body:any){
      return this.http.post(`${this.urlback}Pedido/InsertarPedido`,body)
    }

    updatePedidoEnca(body:any){
      return this.http.put(`${this.urlback}Pedido/ActualizarPedido`,body)
    }

    finalizarPedido(body:any){
      return this.http.post(`${this.urlback}Pedido/FinalizarPedido`,body)
    }


    //PedidoDetalle
    insPedidoDetalle(body:any){
      return this.http.post(`${this.urlback}PedidoDetalle/NuevoDetalle`,body)
    }

    updatePedidoDetalle(body:any){
      return this.http.put(`${this.urlback}PedidoDetalle/ActualizarDetalle`,body)
    }

    consPedidoDetalle(body:any){
      return this.http.get(`${this.urlback}PedidoDetalle/ListDetalle?id=${body}`)
    }

    deletePedidoDetalle(body:any){
      return this.http.delete(`${this.urlback}PedidoDetalle/EliminarDetalle?id=${body}`)
    }



    //ConsPedidos


    consPedidoUsuario(body:any){
      return this.http.get(`${this.urlback}Pedido/ListPedidosUsr?id_Usuario=${body}`)
    }

    consPedidoAdmin(){
      return this.http.get(`${this.urlback}Pedido/ListPedidosAdm`)
    }

    



    


}
