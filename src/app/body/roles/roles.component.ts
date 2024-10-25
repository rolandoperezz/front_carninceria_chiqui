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
import { Loading } from 'notiflix';


@Component({
  selector: 'app-roles',
  standalone: false,
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {

  formConsulta! : FormGroup
  error: boolean = false
  cat_roles: any
  datos: any

  tituloModal: any
  tipo_modal: any
  displayModal: boolean = false;
  datosPaginas:any
  formConsulta2! : FormGroup
  id_rol: any;
  paginas:any

  constructor(    private Router : Router,
    private ConsultaService : ConsultasService,
private ActivatedRoute : ActivatedRoute,
private formBuilder : FormBuilder

    ) {
        this.formulario()
        this.formulario1()

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
      this.consPagina()

    })
  }

  consPagxRol(id:any){
    this.ConsultaService.consPaginasRol(id).subscribe(info=>{
      console.log(info)
      this.datosPaginas = info
    })
  }


  consPagina(){
    this.ConsultaService.consPaginas().subscribe(info=>{
      console.log(info)
      this.paginas = info
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
  
  
  private formulario1(){
    this.formConsulta2 = this.formBuilder.group(
      {
        idRol_Pagina:                [''],
        id_Rol:                [''],
        id_Pagina:                      ['', Validators.required],
      }
    );
  }


  public tipoModal(tipo:any,valor:any){
    this.tipo_modal = tipo
    switch (this.tipo_modal) {
      case 'A':
        this.tituloModal = 'Agregar Proveedor'
        this.showModalDialog();
        this.formulario()
        break;
        case 'E':
          this.tituloModal = 'Editar Proveedor'
        this.showModalDialog();
        this.formConsulta.patchValue(valor)
        break;
        case 'P':
          this.tituloModal = 'Menus Asignadas'
          this.consPagxRol(valor.id_Rol)
          this.showModalDialog();
          this.id_rol = valor.id_Rol
           break;
           case 'AP':
            this.tituloModal = 'Agregar Menu'
            this.formulario1()

           break;
           case 'EP':
            this.tituloModal = 'Editar Menu'
            this.formConsulta2.patchValue(valor)
           break;
      default:
        break;
    }

   

  }



  guardar(){
    Loading.hourglass()
    switch (this.tipo_modal) {
      case 'A':
        if (this.formConsulta.valid) {
          this.formConsulta.removeControl('id_Rol')
          // this.formConsulta.controls['USUARIO_WEB'].setValue(this.datos_usuario.nombre)
          this.ConsultaService.insRoles(this.formConsulta.value).subscribe(info=>{
            // console.log(info)
            if (info === true) {
             this.not_success('Registro Guardado')
             this.modalclose()
              this.consRoles()
              Loading.remove()

           }else{
             this.modalclose()
             this.not_error('A ocurrido un error, intente nuevamente')
             this.consRoles()
             Loading.remove()

            }
       })
    
        }else{
          this.not_warning('Llene los campos requeridos')
          this.error = true
          this.markAllFieldsAsTouched(this.formConsulta);
          Loading.remove()

        }
        break;
      case 'E':
        if (this.formConsulta.valid) {
          this.formConsulta.removeControl('USUARIO_WEB')
          // this.formConsulta.controls['USUARIO_MODIFICA_WEB'].setValue(this.datos_usuario.nombre)
          this.ConsultaService.updateRoles(this.formConsulta.value).subscribe(info=>{
            // console.log(info)
            if (info) {
             this.not_success('Registro Actualizado')
             this.modalclose()
             this.consRoles()
             Loading.remove()

            }else{
             this.modalclose()
             this.not_error('A ocurrido un error, intente nuevamente')
             this.consRoles()
             Loading.remove()

            }
       })
    
        }else{
          this.not_warning('Llene los campos requeridos')
          this.error = true
          this.markAllFieldsAsTouched(this.formConsulta);
          Loading.remove()

        }
        break;
        case 'AP':
          if (this.formConsulta2.valid) {
            this.formConsulta2.removeControl('idRol_Pagina')
           this.formConsulta2.controls['id_Rol'].setValue(this.id_rol)
            this.ConsultaService.insPaginasRol(this.formConsulta2.value).subscribe(info=>{
              console.log(info)
              if (info === true) {
               this.not_success('Registro Guardado')
               this.tipoModal('P',{id_Rol:this.id_rol})
               Loading.remove()

               
             }else{
               this.not_error('A ocurrido un error, intente nuevamente')
               this.tipoModal('P',{id_Rol:this.id_rol})
               Loading.remove()

              }
         })
      
          }else{
            this.not_warning('Llene los campos requeridos')
            this.error = true
            this.markAllFieldsAsTouched(this.formConsulta2);
            Loading.remove()

          }
        break;

        case 'EP':
          if (this.formConsulta2.valid) {
            this.formConsulta2.controls['id_Rol'].setValue(this.id_rol)
            this.ConsultaService.updaPaginasRol(this.formConsulta2.value).subscribe(info=>{
               console.log(info)
              if (info == true) {
               this.not_success('Registro Actualizado')
               this.tipoModal('P',{id_Rol:this.id_rol})
               Loading.remove()


              }else{
               this.not_error('A ocurrido un error, intente nuevamente')
               this.tipoModal('P',{id_Rol:this.id_rol})
               Loading.remove()

              }
         })
      
          }else{
            this.not_warning('Llene los campos requeridos')
            this.error = true
            this.markAllFieldsAsTouched(this.formConsulta);
            Loading.remove()

          }
          break;
    
      default:
        break;
    }
  }


  not_seguro1(data:any){
    Confirm.show(
      'Importante',
      'Esta seguro que desea eliminar la ficha?',
      'Aceptar',
      'Cancelar',
      () => {
        this.eliminar(data)
      },
      () => {
  
      },
      {
      },
      );
  }

  eliminar(data){
      console.log(data)
      this.ConsultaService.deletePaginasRol(data.idRol_Pagina).subscribe(info=>{
          if (info=== true) {
              this.not_success('Menu Eliminado con Exito')
              this.tipoModal('P',{id_Rol:this.id_rol})
          }
      })
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
