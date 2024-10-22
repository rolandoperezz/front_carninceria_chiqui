import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { ConsultasService } from '../services/consultas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    info: any
    formConsulta1: FormGroup | any;
    isDisabled: boolean = true;
    display: any = false;
    validaPassword: boolean = false

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,   private ConsultaService : ConsultasService,  private Router : Router, private formBuilder: FormBuilder) {
        this.Formulario1()
     }


    ngOnInit(): void {
        // Escucha el evento popstate cuando el usuario navega hacia atrás
     
    
      this.info = this.ConsultaService.getToken()
        console.log(this.info)

    
      }

      isMobile(): boolean {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return width < 576; // Se considera móvil si el ancho es menor que 576px
      }

    logout() {
        this.ConsultaService.logout();
      console.log("Token eliminado del localStorage.");
      // Navega a 'auth/inicio' reemplazando la URL actual
      this.Router.navigate(['auth', 'inicio'], { replaceUrl: true });
      }

      VerPerfil(){
        this.display = true
        this.formConsulta1.controls['id_Usuario'].setValue(this.info.id_Usuario)
        this.formConsulta1.controls['nombre'].setValue(this.info.nombre)
        this.formConsulta1.controls['direccion'].setValue(this.info.direccion)
        this.formConsulta1.controls['telefono'].setValue(this.info.telefono)
        this.formConsulta1.controls['correo'].setValue(this.info.correo)
        this.formConsulta1.controls['fecha_Registro'].setValue(this.info.fecha_Registro)
        this.formConsulta1.controls['id_Rol'].setValue(this.info.id_Rol)
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

    cerrar(){
        this.display = false
    }


      private Formulario1(){
        this.formConsulta1 = this.formBuilder.group(
          {
            id_Usuario: ['',],
            nombre: ['', Validators.required],  // Valor inicial y validador requerido
            direccion: ['', ],
            telefono: ['', Validators.required ],
            correo: ['',  Validators.required],
            contraseña: ['',  Validators.required],
            confirmacionContraseña: ['', Validators.required],
            fecha_Registro: ['', ],
            id_Rol: ['', ]
          }
        );
      }


      actualizar(){
        Loading.hourglass()
        if (this.formConsulta1.valid) {
            console.log(this.formConsulta1.value)
            // this.formConsulta.controls['USUARIO_MODIFICA_WEB'].setValue(this.datos_usuario.nombre)
            this.ConsultaService.updateUsuarios(this.formConsulta1.value).subscribe(info=>{
              // console.log(info)
              if (info) {
               this.not_success('Contraseña Actualizada')
               this.cerrar()
               Loading.remove()
             }else{
               this.cerrar()
               this.not_error('A ocurrido un error, intente nuevamente')
               Loading.remove()
             }
         })
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
