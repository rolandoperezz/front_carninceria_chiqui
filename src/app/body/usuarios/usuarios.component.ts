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
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  formConsulta! : FormGroup
  error: boolean = false
  cat_roles: any
  datos: any


  tituloModal: any
  tipo_modal: any
  displayModal: boolean = false;
  validaPassword: boolean = false

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
    this.consUsuarios()
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
      // console.log(info)
      this.cat_roles = info
    })
  }


  consUsuarios(){
    this.ConsultaService.consUsuarios().subscribe(info=>{
      console.log(info)
      this.datos = info
    })
  }

  private formulario(){
    this.formConsulta = this.formBuilder.group({
      id_Usuario: ['',],
      nombre: ['', Validators.required],  // Valor inicial y validador requerido
      direccion: ['', ],
      telefono: ['', Validators.required ],
      correo: ['',  Validators.required],
      contraseña: ['',  Validators.required],
      confirmacionContraseña: ['', Validators.required],
      fecha_Registro: ['', ],
      id_Rol: ['', ]
    });
  }

  confirmacion(){
    
    if (this.formConsulta.controls['confirmacionContraseña'].value === this.formConsulta.controls['contraseña'].value ) {
      console.log('contraseñas coinciden')
      this.validaPassword = false
    }else{
      this.validaPassword = true
      console.log('contraseñas no coinciden')
    }
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
        this.tituloModal = 'Agregar Usuario'
        this.showModalDialog();
        this.formulario()
       
    }else{
      if (this.tipo_modal == 'E') {
        this.tituloModal = 'Editar Usuario'
        this.showModalDialog();
        this.formConsulta.patchValue(valor)
      }
    }
  }



  guardar(){
    switch (this.tipo_modal) {
      case 'A':
        if (this.formConsulta.valid) {

          if (this.validaPassword == false) {
            this.formConsulta.controls['fecha_Registro'].setValue(moment().format('YYYY-MM-DD'))
            // this.formConsulta.controls['id_rol'].setValue(1)
            this.formConsulta.removeControl('confirmacionContraseña')
            this.formConsulta.removeControl('id_Usuario')
            // this.formConsulta.controls['USUARIO_WEB'].setValue(this.datos_usuario.nombre)
            this.ConsultaService.RegistroUsuario(this.formConsulta.value).subscribe(info=>{
              // console.log(info)
              if (info === true) {
               this.not_success('Registro Guardado')
               this.modalclose()
                this.cat_roles()
             }else{
               this.modalclose()
               this.not_error('A ocurrido un error, intente nuevamente')
               this.cat_roles()
             }
         })
          }else{

          }
        
    
        }else{
          this.not_warning('Llene los campos requeridos')
          this.error = true
          this.markAllFieldsAsTouched(this.formConsulta);
        }
        break;
      case 'E':
        if (this.formConsulta.valid) {
          this.formConsulta.removeControl('USUARIO_WEB')
          // this.formConsulta.controls['USUARIO_MODIFICA_WEB'].setValue(this.datos_usuario.nombre)
          this.ConsultaService.updateUsuarios(this.formConsulta.value).subscribe(info=>{
            // console.log(info)
            if (info) {
             this.not_success('Registro Actualizado')
             this.modalclose()
              // this.catEstado()
           }else{
             this.modalclose()
             this.not_error('A ocurrido un error, intente nuevamente')
            //  this.catEstado()
           }
       })
    
        }else{
          this.not_warning('Llene los campos requeridos')
          this.error = true
          this.markAllFieldsAsTouched(this.formConsulta);
        }
        break;
    
      default:
        break;
    }
  }


private markAllFieldsAsTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      this.markAllFieldsAsTouched(control);
    }
  });
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
