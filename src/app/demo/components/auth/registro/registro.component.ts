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
  selector: 'app-registro',
  standalone:false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  valCheck: string[] = ['remember'];



  password!: string;

  formConsulta! : FormGroup

  validaPassword: boolean = false

  constructor(public layoutService: LayoutService,     private Router : Router,
      private ConsultaService : ConsultasService,
  private ActivatedRoute : ActivatedRoute,
  private formBuilder : FormBuilder,private primengConfig: PrimeNGConfig
      ) {

          this.formularioRegistro()
       }


       ngOnInit(): void {
        // this.catAsignaNotificaciones()
       //  this.catalogos()
       //  this.fecha()
   }




   private formularioRegistro(){
     this.formConsulta = this.formBuilder.group({
       nombre: ['', Validators.required],  // Valor inicial y validador requerido
       direccion: ['', ],
       telefono: ['', Validators.required ],
       correo: ['',  Validators.required],
       contraseña: ['',  Validators.required],
       confirmacionContraseña: ['', Validators.required],
       fecha_Registro: ['', ],
       id_rol: ['', ]
     });
   }


   registro(){

    if (this.formConsulta.valid ) {
        // console.log(this.formConsulta.value)
      if (this.validaPassword == false) {

        this.formConsulta.controls['fecha_Registro'].setValue(moment().format('YYYY-MM-DD'))
        this.formConsulta.controls['id_rol'].setValue(3)
        this.formConsulta.removeControl('confirmacionContraseña')


        console.log(this.formConsulta.value)

        this.ConsultaService.RegistroUsuario(this.formConsulta.value).subscribe(info=>{
          console.log(info)

          if(info == true){
              this.not_success('Registro Completo, Inicia Sesion!')
              this.ConsultaService.CorreoBienvenida({to:this.formConsulta.controls['correo'].value}).subscribe(info=>{
                  console.log(info)
              })
              this.Router.navigateByUrl('auth/login').then(() => {
                // Limpiar el historial para que no pueda volver al login
                window.history.pushState(null, '', 'auth/login');
              });
            }
      
      },error=>{
          if (error['status'] == 404) {

              this.not_warning(error['error'])
          }
      })

      }else{
        this.not_warning('Las contraseñas no coinciden')

      }
       

    }else{
        this.not_warning('Llene los Campos Requeridos')
        // console.log('campos requeridos')
    }
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
