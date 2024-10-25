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
import { encabezado } from './class';

@Component({
  selector: 'app-compras',
  standalone: false,
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss'
})
export class ComprasComponent {
  formConsulta! : FormGroup
  formConsulta1! : FormGroup

  error: boolean = false
  datos: any
cat_estados:any
cat_proveedores:any
cat_productos:any

  tituloModal: any
  tipo_modal: any
  displayModal: boolean = false;


  datosDetalle:any
  id_enca:any

  products2: encabezado[] | any;
clonedProducts: { [s: string]: encabezado; } = {};

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
    this.consCompras()
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



  consCompras(){
    this.ConsultaService.consCompraEnca().subscribe(info=>{
      console.log(info)
      this.datos = info
      this.consProveedores()

    })
  }

  consProveedores(){
    this.ConsultaService.consProveedores().subscribe(info=>{
      console.log(info)
      this.cat_proveedores = info
      this.consEstado()

    })
  }

  consProductos(){
    this.ConsultaService.consProductos().subscribe(info=>{
      console.log(info)
      this.cat_productos = info
      
    })
  }

  consEstado(){
    this.ConsultaService.consCategorias().subscribe(info=>{
      console.log(info)
      this.cat_estados = info
      this.consProductos()
    })
  }


  private formulario(){
    this.formConsulta = this.formBuilder.group({
      id_Orden_Enca: ['', ],
      id_Proveedor: ['', Validators.required ],
      numero_Orden: ['', Validators.required],
      id_Estado:    ['', ],
      observacion:  ['', Validators.required ],
    });
  }

  
  private formulario1(){
    this.formConsulta1 = this.formBuilder.group({
      id_Orden_deta: ['', ],
      id_Orden_Enca: ['', ],
      id_Producto: ['', Validators.required],
      cantidad:    ['', Validators.required],
      precio_Unitario:  ['', Validators.required],
      observacion:  ['', ]
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
        this.tituloModal = 'Agregar Compra'
        this.showModalDialog();
        this.formulario()
        break;
        case 'E':
          this.tituloModal = 'Editar Compra'
        this.showModalDialog();
        this.formConsulta.patchValue(valor)
        break;
        case 'VD':
          this.tituloModal = 'Detalle Compra'
          this.showModalDialog();
          this.id_enca = valor.id_Orden_Enca
          this.consDetalle(this.id_enca)
           break;
      default:
        break;
    }

   

  }


  consDetalle(id){
    this.ConsultaService.consCompraDeta(id).subscribe(info=>{
      console.log(info)
      this.datosDetalle = info
    })
  }



  guardar(){
    switch (this.tipo_modal) {
      case 'A':
        if (this.formConsulta.valid) {
          this.formConsulta.removeControl('id_Orden_Enca')
          this.ConsultaService.insCompraEnca(this.formConsulta.value).subscribe(info=>{
             console.log(info)
            if (info === true) {
             this.not_success('Registro Guardado')
             this.modalclose()
              this.consCompras()
           }else{
             this.modalclose()
             this.not_error('A ocurrido un error, intente nuevamente')
             this.consCompras()
           }
       })
    
        }else{
          this.not_warning('Llene los campos requeridos')
          this.error = true
          this.markAllFieldsAsTouched(this.formConsulta);
        }
        break;
      case 'E':
        if (this.formConsulta.valid) {
          this.ConsultaService.updateCompraEnca(this.formConsulta.value).subscribe(info=>{
            console.log(info)
            if (info) {
             this.not_success('Registro Actualizado')
             this.modalclose()
             this.consCompras()
            }else{
             this.modalclose()
             this.not_error('A ocurrido un error, intente nuevamente')
             this.consCompras()
            }
       })
    
        }else{
          this.not_warning('Llene los campos requeridos')
          this.error = true
          this.markAllFieldsAsTouched(this.formConsulta);
        }
        break;
      case 'VD':
        if (this.formConsulta1.valid) {
          this.formConsulta1.removeControl('id_Orden_deta')
          this.formConsulta1.controls['id_Orden_Enca'].setValue(this.id_enca)
          this.ConsultaService.insCompraDeta(this.formConsulta1.value).subscribe(info=>{
             console.log(info)
            if (info === true) {
             this.not_success('Registro Guardado')
             this.consDetalle(this.id_enca)
             this.formulario1()
            }else{
             this.not_error('A ocurrido un error, intente nuevamente')
             this.consDetalle(this.id_enca)
             this.formulario1()
            }
       })
    
        }else{
          this.not_warning('Llene los campos requeridos')
          this.error = true
          this.markAllFieldsAsTouched(this.formConsulta1);
        }
        break;
    
      default:
        break;
    }
  }






  //Para Editar Detalle

  onRowEditInitM(product: encabezado) {
    this.clonedProducts[product.id_Orden_Enca] = {...product};
    }
  
    onRowEditSaveM(product: encabezado) {
      // console.log(product)
    if (product.cantidad != null && product.precio_Unitario != null) {
      var tmp = []
      tmp.push({id_Orden_deta:product.id_Orden_deta,
                cantidad:product.cantidad,
                id_Producto:product.id_Producto,
                precio_Unitario:product.precio_Unitario,
                observacion:product.observacion})
            console.log(tmp[0])
            this.ConsultaService.updateCompraDeta(tmp[0]).subscribe(info=>{
              console.log(info)
                if (info) {
                    this.not_success('Actualización Exitosa')
                   this.consDetalle(this.id_enca)
                }else{
                    this.not_warning('No se actualizo, intente nuevamente')
                    this.consDetalle(this.id_enca)
                }
            },error=>{
                console.log(error)
            })
        
    }else{
      this.not_warning('Ingrese datos en Cantidad o Precio Unitario')
      this.consDetalle(this.id_enca)
    }
  
  
  
    }
  
    onRowEditCancelM(product: encabezado, index: number) {
      // this.products2 = encabezado
        this.products2[index] = this.clonedProducts[product.id_Orden_deta];
        delete this.clonedProducts[product.id_Orden_deta];
    }


    //Para eliminar Detalle


    not_seguro1(data:any){
      Confirm.show(
        'Importante',
        'Esta seguro que desea eliminar el producto?',
        'Aceptar',
        'Cancelar',
        () => {
          this.eliminarDetalle(data)
        },
        () => {
    
        },
        {
        },
        );
    }

  eliminarDetalle(id:any){
    console.log(id)
    this.ConsultaService.deleteCompraDeta(id.id_Orden_deta).subscribe(info=>{
      console.log(info)
      if (info) {
       this.not_success('Registro Eliminado')
       this.consDetalle(this.id_enca)
      }else{
       this.not_error('A ocurrido un error, intente nuevamente')
       this.consDetalle(this.id_enca)
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
