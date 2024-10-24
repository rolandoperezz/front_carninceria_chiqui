import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Product } from './productos';
@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  searchTerm: string = '';
  currentPage = 1;
  itemsPerPage = 5;

  products = []
  filtro: any;
  filtro1: any;

  datostmp:any
  categorias:any
  selectedCat: string | undefined;

  // filteredProducts: any[] = [...this.products]; // Inicialización correcta de productos filtrados

  constructor(
    private Router: Router,
    private ConsultaService: ConsultasService
  ) {}

  ngOnInit(): void {
    window.addEventListener('popstate', this.handlePopState.bind(this));
    if (!this.ConsultaService.isAuthenticated()) {
      this.Router.navigate(['auth', 'inicio'], { replaceUrl: true });
    }

     // Definir productos (28 productos)
 this.products = [
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},
{
  id: '1001',
  code: 'f230fh0g3',
  name: 'Mixco',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'telefono',
  quantity: 22,
  inventoryStatus: 'OUTOFSTOCK',
  rating: 5
},
{
  id: '1004',
  code: 'f230fh0g3',
  name: 'Telefono',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 0,
  inventoryStatus: 'INSTOCK',
  rating: 5
},
{
  id: '1002',
  code: 'f230fh0g3',
  name: 'smart tv',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'telefono',
  quantity: 10,
  inventoryStatus: 'LOWSTOCK',
  rating: 5
},
];

this.datostmp = this.products
this.catCategorias()

  }

  ngOnDestroy(): void {
    window.removeEventListener('popstate', this.handlePopState.bind(this));
  }

  handlePopState(event: any): void {
    this.ConsultaService.logout();
    this.Router.navigate(['auth', 'inicio'], { replaceUrl: true });
  }


  catCategorias(){
    var categorias = []
    categorias = [...new Set(this.products.map(item => item.category))];
    categorias.sort((a, b) => a.localeCompare(b));
    this.categorias = categorias
    console.log(this.categorias)
   }


  getSeverity (product: Product) {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};

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
        const valorCampoEspecifico = item['category'];
  
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
      const valorCampoEspecifico = item['category'];

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


  // Búsqueda de productos
  // searchProducts(term: string): void {
  //   this.filteredProducts = this.products.filter(product =>
  //     product.name.toLowerCase().includes(term.toLowerCase())
  //   );
  //   this.currentPage = 1;
  // }

  // Obtener productos paginados
  // get paginatedProducts() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  // }

  // Cambiar de página
  // changePage(page: number): void {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.currentPage = page;
  //   }
  // }

  // Cambiar la cantidad de productos por página
  // changeItemsPerPage(value: string): void {
  //   this.itemsPerPage = +value;
  //   this.currentPage = 1;
  // }

  // Total de páginas
  // get totalPages(): number {
  //   return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  // }

  // get totalPagesArray(): number[] {
  //   return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  // }
}
