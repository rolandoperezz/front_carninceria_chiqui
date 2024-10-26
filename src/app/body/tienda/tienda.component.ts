import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Product } from './productos';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validator,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
moment.locale('us');


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {
  formConsulta! : FormGroup

  products:any = []
  filtro: any;
  filtro1: any;

  datostmp:any
  categorias:any
  selectedCat: string | undefined;
  error: boolean = false

  datosPedido = []
  selectedItems: any[] = []; // Array para almacenar los artículos seleccionados
datosUsuario:any

  tituloModal: any
  tipo_modal: any
  displayModal: boolean = false;
  total: any;
  // filteredProducts: any[] = [...this.products]; // Inicialización correcta de productos filtrados

  constructor(
    private Router : Router,
    private ConsultaService : ConsultasService,
private ActivatedRoute : ActivatedRoute,
private formBuilder : FormBuilder
  ) {
    this.formulario()
  }

  ngOnInit(): void {
    window.addEventListener('popstate', this.handlePopState.bind(this));
    if (!this.ConsultaService.isAuthenticated()) {
      this.Router.navigate(['auth', 'inicio'], { replaceUrl: true });
    }

    this.datosUsuario =  this.ConsultaService.getToken()
    // console.log(this.datosUsuario)


this.consProductos()

  }

  ngOnDestroy(): void {
    window.removeEventListener('popstate', this.handlePopState.bind(this));
  }

  handlePopState(event: any): void {
    this.ConsultaService.logout();
    this.Router.navigate(['auth', 'inicio'], { replaceUrl: true });
  }



  consProductos(){
    this.ConsultaService.consTienda().subscribe(info=>{
       console.log(info)
      this.products = info
      this.datostmp = this.products
      this.catCategorias()
    })
  }


  catCategorias(){
    var categorias = []
    categorias = [...new Set(this.products.map(item => item.categoria))];
    categorias.sort((a, b) => a.localeCompare(b));
    this.categorias = categorias
    // console.log(this.categorias)
   }




aplicarFiltrosN(): void {

  if (this.filtro) {
    this.filtro = this.filtro.toLowerCase(); // Convertir a minúsculas

    this.products = this.datostmp.filter(item => {
      return Object.values(item).some(val => {
        if (typeof val === 'string') {
          return val.toLowerCase().includes(this.filtro);
        }else{
          // return this.denuncias_cerradas.includes(val)
        }
        return false;
      });
    });

    if (this.filtro1) {
      this.products = this.products.filter(item => {
        // Reemplaza 'campoEspecifico' con el nombre del campo que deseas filtrar (en este caso, 'ZONA')
        const valorCampoEspecifico = item['categoria'];

        if (typeof valorCampoEspecifico === 'string') {
          return valorCampoEspecifico.includes(this.filtro1);
        } else {
          return false;
          // Si el campo no es de tipo string, ajusta la lógica según tus necesidades
          // Por ejemplo, podrías usar un array de valores permitidos y verificar la inclusión
          // return this.valoresPermitidos.includes(valorCampoEspecifico);
        }
      });
    }


  } else {
      if (this.filtro1) {

      }else{
        this.products = [...this.products]; // Mostrar todos los datos si el filtro está vacío
      }
  }
}

aplicarFiltros1(): void {
  this.filtro1 = this.filtro1// Convertir a minúsculas

  if (this.filtro1) {
    this.products = this.datostmp.filter(item => {
      // Reemplaza 'campoEspecifico' con el nombre del campo que deseas filtrar (en este caso, 'ZONA')
      const valorCampoEspecifico = item['categoria'];

      if (typeof valorCampoEspecifico === 'string') {
        return valorCampoEspecifico.includes(this.filtro1);
      } else {
        return false;
        // Si el campo no es de tipo string, ajusta la lógica según tus necesidades
        // Por ejemplo, podrías usar un array de valores permitidos y verificar la inclusión
        // return this.valoresPermitidos.includes(valorCampoEspecifico);
      }
    });

    if (this.filtro) {
      this.products = this.products.filter(item => {
        return Object.values(item).some(val => {
          if (typeof val === 'string') {
            return val.toLowerCase().includes(this.filtro);
          } else {
            // Ajusta la lógica según tus necesidades si el campo no es de tipo string
            // return this.valoresPermitidos.includes(val);
            return false;
          }
        });
      });
    }


  } else {
    if (this.filtro) {

    }else{
      this.products = [...this.datostmp]; // Mostrar todos los datos si el filtro está vacío
    }
  }
}


carrito(valor:any){

    // this.datosPedido.push(valor)

    if (!this.datosPedido.includes(valor)) {
      this.datosPedido.push(valor);
      // console.log(this.datosPedido)
      this.not_success('Producto agregado a carrito')
      // Aquí puedes agregar la lógica para añadir el artículo al carrito
  }


    // console.log(this.datosPedido)
}

isItemSelected(item: any): boolean {
  return this.datosPedido.includes(item);
}

private formulario(){
  this.formConsulta = this.formBuilder.group({
    id_Pedido : ['', ],
    Fecha_Pedido  : ['', ],
    id_Usuario  : ['', ],
    id_Estado   : ['', ],
    Fecha_Programada : ['',Validators.required],
    // total : [''],

  });
}


showModalDialog() {
  this.displayModal = true;
}

public modalclose(){
  this.displayModal = false
  this.formulario()
}


limpiar(){
  this.formulario()
  this.datosPedido = []
}


public tipoModal(tipo:any,valor:any){
  this.tipo_modal = tipo

  switch (this.tipo_modal) {
    case 'A':
      this.tituloModal = 'Carrito'
      this.showModalDialog();
      // this.formulario()
      break;
      case 'E':
        this.tituloModal = 'Carrito'
      this.showModalDialog();
      // this.formConsulta.patchValue(valor)
      break;

    default:
      break;
  }
}

calcularSubtotal(index: number, cantidad:any) {
  this.datosPedido[index].cantidad = cantidad.target.value
  this.datosPedido[index].subtotal =   this.datosPedido[index].cantidad * this.datosPedido[index].precio_Venta;

  // console.log(producto)
  this.calcularTotal();
}

calcularTotal() {
  this.total = this.datosPedido.reduce((acc, item) => acc + item.subtotal, 0);
}
eliminarProducto(index: number) {
  this.datosPedido.splice(index, 1);
  this.calcularTotal(); // Actualiza el total después de eliminar
}


guardar(){
  switch (this.tipo_modal) {
    case 'A':
      if (this.formConsulta.valid) {
        this.formConsulta.removeControl('id_Pedido')
        this.formConsulta.removeControl('Fecha_Pedido')
        this.formConsulta.controls['id_Usuario'].setValue(this.datosUsuario.id_Usuario)
        this.formConsulta.controls['id_Estado'].setValue(4)
        // this.formConsulta.controls['total'].setValue(this.total)


        // if (this.formConsulta.controls['Fecha_Programada'].value != '') {
        //   this.formConsulta.controls['id_Usuario'].setValue(moment(this.formConsulta.controls['Fecha_Programada'].value).format('DD/MM/YYYY'))
        // }


        console.log(this.formConsulta.value)

        this.ConsultaService.insPedidoEnca(this.formConsulta.value).subscribe(info=>{
           console.log(info)
          if (info ) {
            var llamadasPromesas = [];

            for (let index = 0; index < this.datosPedido.length; index++) {

              const model = {
                "id_Pedido":info,
                "id_Producto":this.datosPedido[index].id_Producto,
                "Cantidad_Pedido": this.datosPedido[index].cantidad,
                "Precio_Unitario": this.datosPedido[index].precio_Venta,
                // "subTotal":this.datosPedido[index].subtotal,
                // "id_Usuario": this.datosUsuario.id_Usuario
              }

              console.log(model)

              llamadasPromesas.push(
                new Promise<void>((resolve, reject) => {
                  this.ConsultaService.insPedidoDetalle(model).subscribe(info=>{
                    resolve()
                    console.log(info)
                },
                  (error) => {
                    reject(error); // Rechaza la promesa en caso de error
                    console.log(error)
                  })
                })
              );
            }
            Promise.all(llamadasPromesas)
            .then(() => {
              // this.guardarFoto()
              this.not_success('Pedido Registrado')
              this.modalclose()
              this.limpiar()
              // setTimeout(() => {
              //   window.location.reload();
              // }, 2000);
            })
            .catch((error) => {
              console.error('Error en insert', error);
              this.not_warning('Error en Pedido')
              this.limpiar()

              // setTimeout(() => {
              //   window.location.reload();
              // }, 2000);
            });

          
         }else{
           this.modalclose()
           this.not_error('A ocurrido un error, intente nuevamente')
         }
     })

      }else{
        this.not_warning('Llene los campos requeridos')
        this.error = true
        this.markAllFieldsAsTouched(this.formConsulta);
      }
      break;
    // case 'E':
    //   if (this.formConsulta.valid) {
    //     this.ConsultaService.updateEstado(this.formConsulta.value).subscribe(info=>{
    //       console.log(info)
    //       if (info) {
    //        this.not_success('Registro Actualizado')
    //        this.modalclose()
    //        this.consCatego()
    //       }else{
    //        this.modalclose()
    //        this.not_error('A ocurrido un error, intente nuevamente')
    //        this.consCatego()
    //       }
    //  })

    //   }else{
    //     this.not_warning('Llene los campos requeridos')
    //     this.error = true
    //     this.markAllFieldsAsTouched(this.formConsulta);
    //   }
    //   break;

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
not_seguro(id:any){
  Confirm.show(
    'Importante',
    'Esta seguro que desea eliminar el producto?',
    'Aceptar',
    'Cancelar',
    () => {
      this.eliminarProducto(id)
    },
    () => {

    },
    {
    },
    );
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
