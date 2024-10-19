import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

import { HttpClientModule } from '@angular/common/http';
import { NgClass, UpperCasePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validator,FormBuilder,Validators, FormArray } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ConsultasService } from '../../../../services/consultas.service';

import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

import * as moment from 'moment'; // Esta es la forma recomendada
moment.locale('us');


@Component({
  selector: 'app-recupera',
  standalone: false,
  templateUrl: './recupera.component.html',
  styleUrl: './recupera.component.scss'
})
export class RecuperaComponent {
  password!: string;

  formConsulta! : FormGroup //para ingreso correo

  formConsulta1! : FormGroup // para ingreso contraseñas

  formConsulta2! : FormGroup //para ingresar codigo

  validaPassword: boolean = false // para ver si coinciden o no las contraseñas

  validaCorreo: boolean = false //para la vista, primero donde ingresan el correo y luego para pasar al codigo

  validaCodigo: boolean = false // para pasar del codigo de confirmacion a la contraseña
codigotmp:any
  constructor(public layoutService: LayoutService,     private Router : Router,
      private ConsultaService : ConsultasService,
  private ActivatedRoute : ActivatedRoute,
  private formBuilder : FormBuilder,private primengConfig: PrimeNGConfig
      ) {

          this.formularioCorreo()
          this.formularioContraseña()
          this.formularioCodigo()
       }


       ngOnInit(): void {
        // this.catAsignaNotificaciones()
       //  this.catalogos()
       //  this.fecha()
   }




   private formularioCorreo(){
     this.formConsulta = this.formBuilder.group({
       correo: ['',  Validators.required],
     });
   }


   private formularioContraseña(){
    this.formConsulta2 = this.formBuilder.group({
      contraseña: ['',  Validators.required],
      confirmacionContraseña: ['',  Validators.required],
    });
  }


  private formularioCodigo(){
    this.formConsulta1 = this.formBuilder.group({
      codigo: ['',  Validators.required],
    });
  }


   enviar(){
    Loading.hourglass()
    if (this.formConsulta.valid ) {
        console.log(this.formConsulta.value)
        this.ConsultaService.CorreoPass({correo:this.formConsulta.controls['correo'].value}).subscribe(info=>{
          console.log(info)
          if(info == true){
            
            Loading.remove()
            this.validaCorreo = true

          }else{
            this.not_warning('Correo no existe')
            Loading.remove()
          }
      })
    }else{
        this.not_warning('Ingrese un correo')
        Loading.remove()
        // console.log('campos requeridos')
    }
  }


  esCodigoValido(): boolean {
    const campo = this.formConsulta1.get('codigo');
    return campo?.valid || false;
  }

  codigo(){
    Loading.hourglass()

    if (this.formConsulta1.valid) {

      if (this.formConsulta1.controls['codigo'].value.length === 6) {
          this.ConsultaService.validarCodigo(this.formConsulta1.controls['codigo'].value).subscribe(info=>{
              if (info== true) {
                this.validaCodigo = true
                this.validaCorreo = null
                this.codigotmp = this.formConsulta1.controls['codigo'].value
                this.not_success('Código Valido, Cambie Contraseña')
                Loading.remove()
              }else{
                Loading.remove()
              }
          })
      }else{
        this.not_warning('Codigo debe tener 6 digitos')
        Loading.remove()
      }
    }else{
      this.not_warning('Ingrese Codigo')
      Loading.remove()

    }
  }


  cambio(){
    Loading.hourglass()

      if (this.formConsulta2.valid) {

        if (this.validaPassword == false) {

            this.ConsultaService.cambioContraseña({correo:this.formConsulta.controls['correo'].value, 
              codigo_temp:this.codigotmp, 
              contraseña:this.formConsulta2.controls['contraseña'].value}).subscribe(info=>{
                if (info == true) {
                  this.not_success('Cambio de contraseña Exitoso, Inicia Sesión')
                  this.Router.navigateByUrl('auth/login').then(() => {
                    // Limpiar el historial para que no pueda volver al login
                    window.history.pushState(null, '', 'auth/login');
                  });
                  Loading.remove()

                } else {
                  Loading.remove()
                  this.not_success('Ocurrio un error, intenta de nuevo')
                  this.Router.navigateByUrl('auth/login').then(() => {
                    // Limpiar el historial para que no pueda volver al login
                    window.history.pushState(null, '', 'auth/login');
                  });
                }
              })

        }else{
          this.not_warning('Contraseñas no coinciden')
          Loading.remove()

        }
        // this.validaCodigo = true
        
      }else{
        this.not_warning('Ingrese la contraseña')
        Loading.remove()
      }
  }

  confirmacion(){
      if (this.formConsulta2.controls['confirmacionContraseña'].value === this.formConsulta2.controls['contraseña'].value ) {
        console.log('contraseñas coinciden')
        this.validaPassword = false
      }else{
        this.validaPassword = true
        console.log('contraseñas no coinciden')
      }
  }

  regresar(){
    this.validaCorreo = false
  }

  regresar1(){
    this.validaCorreo = true
    this.validaCodigo = false
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
