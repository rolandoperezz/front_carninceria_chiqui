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
  selector: 'app-pedidos-admin',
  standalone: false,
  templateUrl: './pedidos-admin.component.html',
  styleUrl: './pedidos-admin.component.scss'
})
export class PedidosAdminComponent {
  formConsulta! : FormGroup
  error: boolean = false
  datos: any
cat_estados:any
  tituloModal: any
  tipo_modal: any
  displayModal: boolean = false;
  datosUsuario:any
  datosDetalle:any
  id_enca: any;
  id_Pedido: any;

  products2: encabezado[] | any;
  clonedProducts: { [s: string]: encabezado; } = {};

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
    this.datosUsuario =  this.ConsultaService.getToken()
    this.consCatego()

    // this.consEstados()
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



  consCatego(){
    
    this.ConsultaService.consPedidoUsuario(this.datosUsuario.id_Usuario).subscribe(info=>{
      console.log(info)
      this.datos = info
      this.consEsta()
    })
  }

  consEsta(){
    this.ConsultaService.consEstado().subscribe(info=>{
      this.cat_estados = info
    })
  }


  private formulario(){
    this.formConsulta = this.formBuilder.group({
      id_Pedido : ['', ],
      Fecha_Programada: ['', Validators.required],
      id_Estado: [''],
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
    if (this.tipo_modal == 'V') {
      this.tituloModal = 'Detalle Pedido'
      this.showModalDialog();
      this.id_Pedido = valor.id_Pedido
      this.consDetalle(this.id_Pedido)
        
        // this.formulario()
       
    }else{
      if (this.tipo_modal == 'E') {
        this.tituloModal = 'Editar Pedido'
        this.showModalDialog();

        var tmp = moment(valor.Fecha_Programada).format('YYYY-MM-DD')
       valor.Fecha_Programada = tmp
        this.formConsulta.patchValue(valor)
      }
    }
  }



  consDetalle(id){
    this.ConsultaService.consPedidoDetalle(id).subscribe(info=>{
      console.log(info)
      this.datosDetalle = info
    })
  }


  guardar(){
    switch (this.tipo_modal) {
      // case 'A':
      //   if (this.formConsulta.valid) {
      //     this.formConsulta.removeControl('id_Estado')
      //     this.ConsultaService.insCategorias(this.formConsulta.value).subscribe(info=>{
      //       // console.log(info)
      //       if (info === true) {
      //        this.not_success('Registro Guardado')
      //        this.modalclose()
      //         this.consCatego()
      //      }else{
      //        this.modalclose()
      //        this.not_error('A ocurrido un error, intente nuevamente')
      //        this.consCatego()
      //      }
      //  })
    
      //   }else{
      //     this.not_warning('Llene los campos requeridos')
      //     this.error = true
      //     this.markAllFieldsAsTouched(this.formConsulta);
      //   }
      //   break;
      case 'E':
        if (this.formConsulta.valid) {
          console.log(this.formConsulta.value)
          this.ConsultaService.updatePedidoEnca(this.formConsulta.value).subscribe(info=>{
            console.log(info)
            if (info) {
             this.not_success('Registro Actualizado')
             this.modalclose()
             this.consCatego()
            }else{
             this.modalclose()
             this.not_error('A ocurrido un error, intente nuevamente')
             this.consCatego()
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



onRowEditInitM(product: encabezado) {
  this.clonedProducts[product.id_Pedido] = {...product};
  }

  onRowEditSaveM(product: encabezado) {
    // console.log(product)
  if (product.cantidad_Pedido != null) {
    var tmp = []
    tmp.push({id_Detalle_Pedido:product.id_Detalle_Pedido,
      cantidad_Pedido:product.cantidad_Pedido,
              id_Producto:product.id_Producto,
              precio_Unitario:product.precio_Unitario,
             })
          console.log(tmp[0])
          this.ConsultaService.updatePedidoDetalle(tmp[0]).subscribe(info=>{
            console.log(info)
              if (info) {
                  this.not_success('Actualización Exitosa')
                 this.consDetalle(this.id_Pedido)
              }else{
                  this.not_warning('No se actualizo, intente nuevamente')
                  this.consDetalle(this.id_Pedido)
              }
          },error=>{
              console.log(error)
          })
      
  }else{
    this.not_warning('Ingrese datos en Cantidad o Precio Unitario')
    this.consDetalle(this.id_Pedido)
  }



  }

  onRowEditCancelM(product: encabezado, index: number) {
    // this.products2 = encabezado
      this.products2[index] = this.clonedProducts[product.id_Detalle_Pedido];
      delete this.clonedProducts[product.id_Detalle_Pedido];
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



  
  not_seguro2(data:any){
    Confirm.show(
      'Importante',
      'Esta seguro que desea dar por Entregado el pedido?',
      'Aceptar',
      'Cancelar',
      () => {
        this.finalizarPedido(data)
      },
      () => {
  
      },
      {
      },
      );
  }


  finalizarPedido(data:any){
    this.ConsultaService.finalizarPedido({id_Pedido:data.id_Pedido}).subscribe(info=>[
      console.log(info)
    ])
  }


eliminarDetalle(id:any){
  console.log(id)
  this.ConsultaService.deletePedidoDetalle(id.id_Detalle_Pedido).subscribe(info=>{
    console.log(info)
    if (info) {
     this.not_success('Registro Eliminado')
     this.consDetalle(this.id_Pedido)
    }else{
     this.not_error('A ocurrido un error, intente nuevamente')
     this.consDetalle(this.id_Pedido)
    }
  })
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
