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
  selector: 'app-proveedores',
  standalone: false,
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent {

  formConsulta! : FormGroup

  error: boolean = false
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
    this.consProve()
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




  consProve(){
    this.ConsultaService.consProveedores().subscribe(info=>{
      console.log(info)
      this.datos = info
    })
  }





  private formulario(){
    this.formConsulta = this.formBuilder.group({
      id_Proveedor: ['',],
      nombre_Proveedor: ['', Validators.required], 
      nombre_Contacto: ['', Validators.required ],      // Valor inicial y validador requerido
      direccion: ['', ],
      telefono: ['',Validators.required ],
      correo: ['',],
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

      default:
        break;
    }
  }



  guardar(){
    Loading.hourglass()
    switch (this.tipo_modal) {
      case 'A':

        if (this.formConsulta.valid) {

            this.formConsulta.removeControl('id_Proveedor')
            this.ConsultaService.insProveedores(this.formConsulta.value).subscribe(info=>{
              // console.log(info)
              if (info === true) {
               this.not_success('Registro Guardado')
               this.modalclose()
                this.consProve()
                Loading.remove()
             }else{
               this.modalclose()
               this.not_error('A ocurrido un error, intente nuevamente')
               this.consProve()
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
          this.ConsultaService.updateProveedores(this.formConsulta.value).subscribe(info=>{
            // console.log(info)
            if (info) {
             this.not_success('Registro Actualizado')
             this.modalclose()
               this.consProve()
               Loading.remove()

           }else{
             this.modalclose()
             this.not_error('A ocurrido un error, intente nuevamente')
             this.consProve()
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
