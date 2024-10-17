import { Component, OnInit, VERSION } from '@angular/core';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validator,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultasService } from 'src/app/services/consultas.service';
import { PrimeNGConfig } from 'primeng/api';
import * as moment from 'moment';
moment.locale('us');
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';


@Component({
  selector: 'app-roles',
  standalone: false,
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {

  formConsulta! : FormGroup

  cat_roles: any
  datos: any

  tituloModal: any
  tipo_modal: any
  displayModal: boolean = false;

  constructor(    private Router : Router,
    private ConsultaService : ConsultasService,
private ActivatedRoute : ActivatedRoute,
private formBuilder : FormBuilder

    ) {
        this.formulario()
     }

  ngOnInit(): void {
    // Escucha el evento popstate cuando el usuario navega hacia atrás
    window.addEventListener('popstate', this.handlePopState.bind(this));

    if (!this.ConsultaService.isAuthenticated()) {
      // Navega a 'auth/inicio' reemplazando la URL actual
      this.Router.navigate(['auth', 'inicio'], { replaceUrl: true });
    }
    this.consRoles()
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



  consRoles(){
    
    this.ConsultaService.consRoles().subscribe(info=>{
      console.log(info)
      this.datos = info
    })
  }

  private formulario(){
    this.formConsulta = this.formBuilder.group({
      id_Rol: ['', ],
      descripcion: ['',Validators.required]
    });
  }

  
  showModalDialog() {
    this.displayModal = true;
  }
  
  public modalclose(){
    this.displayModal = false
     this.formulario()
  }
  
  
  public tipoModal(tipo:any,valor:any){
    this.tipo_modal = tipo
    if (this.tipo_modal == 'A') {
        this.tituloModal = 'Agregar Rol'
        this.showModalDialog();
        this.formulario()
  
    }else{
      if (this.tipo_modal == 'E') {
        this.tituloModal = 'Editar Rol'
        this.showModalDialog();
        this.formConsulta.patchValue(valor)
      }
    }
  }

  guardar(){

  }


  not_warning(text:any){
    Report.warning(
      '',
      `${text}`,
      'Listo',
      );
  }
  
  not_error(text:any){
    Report.failure(
      '',
      `${text}`,
      'Listo',
      );
  }
  
  not_success(text:any){
    Report.success(
      '',
      `${text}`,
      'Listo',
      );
  }

}
