import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  urlback="https://localhost:7237/"

  constructor(private http: HttpClient) { }


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
