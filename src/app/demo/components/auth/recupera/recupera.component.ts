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

    if (this.formConsulta.valid ) {
        // console.log(this.formConsulta.value)

        this.validaCorreo = true

      //   this.ConsultaService.RegistroUsuario(this.formConsulta.value).subscribe(info=>{

      //     if(info == true){

      //         // this.not_success('Registro Completo, Inicia Sesion!')
      //         // this.Router.navigateByUrl('/auth/login');
      //       }
      
      // },error=>{
      //     if (error['status'] == 404) {

      //         this.not_warning(error['error'])
      //     }
      // })


    }else{
        this.not_warning('Ingrese un correo')
        // console.log('campos requeridos')
    }
  }


  codigo(){
    if (this.formConsulta1.valid) {

      this.validaCodigo = true
      this.validaCorreo = null

    }else{
      this.not_warning('Ingrese Codigo')
    }
  }


  cambio(){
      if (this.formConsulta2.valid) {
        console.log('entre en cambio de contraseña')
        // this.validaCodigo = true
        
      }else{
        this.not_warning('Ingrese la contraseña')
      }
  }

  confirmacion(){
      if (this.formConsulta1.controls['confirmacionContraseña'].value === this.formConsulta1.controls['contraseña'].value ) {
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
