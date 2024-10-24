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

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {

  formConsulta! : FormGroup

  error: boolean = false
  cat_roles: any
  datos: any

  cat_categorias:any
  cat_estado:any


  tituloModal: any
  tipo_modal: any
  displayModal: boolean = false;

  uploadedFiles: any[] = [];
  //valida existe foto
  validaFoto: boolean = false
  datosFoto: any
  urlFoto:any

  files = [];

  totalSize : number = 0;

  totalSizePercent : number = 0;
  foto: string;

  constructor(    private Router : Router,
    private ConsultaService : ConsultasService,
private ActivatedRoute : ActivatedRoute,
private formBuilder : FormBuilder,
private primengConfig: PrimeNGConfig

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
    this.consProductos()
    this.consCate()
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

 
  consProductos(){
    this.ConsultaService.consProductos().subscribe(info=>{
      console.log(info)
      this.datos = info
    })
  }

  consCate(){
    this.ConsultaService.consCategorias().subscribe(info=>{
      this.cat_categorias = info
    })
  }
  consEsta(){
    this.ConsultaService.consEstado().subscribe(info=>{
      this.cat_categorias = info
    })
  }



  private formulario(){
    this.formConsulta = this.formBuilder.group({
      id_Producto: ['',],
      id_Categoria: ['', Validators.required], 
      descripcion: ['', Validators.required ],      // Valor inicial y validador requerido
      id_Estado: ['', ],
      foto: ['',],
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
        this.tituloModal = 'Agregar Producto'
        this.showModalDialog();
        this.formulario()
        break;
        case 'E':
          this.tituloModal = 'Editar Producto'
        this.showModalDialog();
        this.formConsulta.patchValue(valor)
        this.foto = valor.foto
        break;

        case 'V':
          this.tituloModal = 'Ver Producto'
        this.showModalDialog();

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

            this.formConsulta.removeControl('id_Producto')
            this.ConsultaService.insProductos(this.formConsulta.value).subscribe(info=>{
              // console.log(info)
              if (info === true) {
               this.not_success('Registro Guardado')
               this.modalclose()
                this.consProductos()
                Loading.remove()
             }else{
               this.modalclose()
               this.not_error('A ocurrido un error, intente nuevamente')
               this.consProductos()
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
          this.ConsultaService.updateProductos(this.formConsulta.value).subscribe(info=>{
            // console.log(info)
            if (info) {
             this.not_success('Registro Actualizado')
             this.modalclose()
               this.consProductos()
               Loading.remove()

           }else{
             this.modalclose()
             this.not_error('A ocurrido un error, intente nuevamente')
             this.consProductos()
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

  not_seguro(){
    Confirm.show(
      'Importante',
      'Esta seguro que desea eliminar la foto y subir una nueva?',
      'Aceptar',
      'Cancelar',
      () => {
        this.deleteFile()
      },
      () => {

      },
      {
      },
      );
  }

  choose(event, callback) {
    callback();
  }


  onFileSelected(event: any) {
    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado del input
  
    if (file && file.type.startsWith('image/')) { // Verifica si el archivo es una imagen
      const reader = new FileReader();
      
      reader.onload = () => {
        this.foto = reader.result as string; // Guarda la imagen en base64 en la variable 'foto'
        this.formConsulta.controls['foto'].setValue(this.foto)
      };
  
      reader.readAsDataURL(file); // Lee el archivo como un Data URL (base64)
      this.validaFoto = true
    } else {
      console.error('El archivo seleccionado no es una imagen válida');
    }
  }



  deleteFile(){
    const inputElement = document.getElementById('upload') as HTMLInputElement;
    inputElement.value = ''; // Esto vacía el valor del input
    this.foto = ''; // Limpia la variable 'foto'
    this.formConsulta.controls['foto'].setValue('')
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
