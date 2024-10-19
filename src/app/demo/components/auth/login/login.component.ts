import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { NgClass, UpperCasePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validator,FormBuilder,Validators, FormArray } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ConsultasService } from '../../../../services/consultas.service';

import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']

})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    formConsulta! : FormGroup

    constructor(public layoutService: LayoutService,     private Router : Router,
        private ConsultaService : ConsultasService,
    private ActivatedRoute : ActivatedRoute,
    private formBuilder : FormBuilder,private primengConfig: PrimeNGConfig
        ) {

            this.formularioInicio()
         }



        ngOnInit(): void {
           // this.catAsignaNotificaciones()
          //  this.catalogos()
          //  this.fecha()
      }




      private formularioInicio(){
        this.formConsulta = this.formBuilder.group({
          correo: ['', Validators.required],  // Valor inicial y validador requerido
          contraseña: ['', Validators.required]
        });
      }

      
      login() {
        if (this.formConsulta.valid) {
          console.log(this.formConsulta.value);
      
          this.ConsultaService.InicioSesion(this.formConsulta.value).subscribe(
            (info: any) => {
              console.log(info)
              // Guardar el token de autenticación
              this.ConsultaService.setToken(info);  // Asegúrate de que 'info.token' contenga el token de respuesta
      
              this.not_success('Bienvenido (a)');
              this.Router.navigate(['layout', 'inicio1'], { replaceUrl: true });

            },
            (error) => {
              if (error['status'] == 404) {
                this.not_warning(error['error']);
              }
            }
          );
        } else {
          this.not_warning('Campos Requeridos');
        }
      }
      

    //   consulta(){
    //     this.ConsultaService.consUsuarios().subscribe(info=>{
    //         console.log(info)
    //     },error=>{
    //         console.log(error)
    //     })
    //   }

    // olvidoContraseña(){
    //     this.Router.navigateByUrl('/auth/registro');
    // }

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
