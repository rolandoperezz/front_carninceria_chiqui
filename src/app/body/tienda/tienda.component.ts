import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  searchTerm: string = '';
  currentPage = 1;
  itemsPerPage = 5;

 // Definir productos (28 productos)
 products = [
  { name: 'Carne de res', price: 50.0, weight: '1 Lb', image: 'assets/layout/images/carne_res.jpg' },
  { name: 'Pollo fresco', price: 25.0, weight: '1 Lb', image: 'assets/layout/images/pollo_fresco.jpg' },
  { name: 'Costillas de cerdo', price: 45.0, weight: '1 Lb', image: 'assets/layout/images/costillas_cerdo.jpg' },
  { name: 'Carne de res', price: 50.0, weight: '1 Lb', image: 'assets/layout/images/carne_res.jpg' },
  { name: 'Pollo fresco', price: 25.0, weight: '1 Lb', image: 'assets/layout/images/pollo_fresco.jpg' },
  { name: 'Costillas de cerdo', price: 45.0, weight: '1 Lb', image: 'assets/layout/images/costillas_cerdo.jpg' },
  { name: 'Carne de res', price: 50.0, weight: '1 Lb', image: 'assets/layout/images/carne_res.jpg' },
  { name: 'Pollo fresco', price: 25.0, weight: '1 Lb', image: 'assets/layout/images/pollo_fresco.jpg' },
  { name: 'Costillas de cerdo', price: 45.0, weight: '1 Lb', image: 'assets/layout/images/costillas_cerdo.jpg' },
  { name: 'Carne de res', price: 50.0, weight: '1 Lb', image: 'assets/layout/images/carne_res.jpg' },
  { name: 'Pollo fresco', price: 25.0, weight: '1 Lb', image: 'assets/layout/images/pollo_fresco.jpg' },
  { name: 'Costillas de cerdo', price: 45.0, weight: '1 Lb', image: 'assets/layout/images/costillas_cerdo.jpg' },
  { name: 'Carne de res', price: 50.0, weight: '1 Lb', image: 'assets/layout/images/carne_res.jpg' },
  { name: 'Pollo fresco', price: 25.0, weight: '1 Lb', image: 'assets/layout/images/pollo_fresco.jpg' },
  { name: 'Costillas de cerdo', price: 45.0, weight: '1 Lb', image: 'assets/layout/images/costillas_cerdo.jpg' },
  { name: 'Carne de res', price: 50.0, weight: '1 Lb', image: 'assets/layout/images/carne_res.jpg' },
  { name: 'Pollo fresco', price: 25.0, weight: '1 Lb', image: 'assets/layout/images/pollo_fresco.jpg' },
  { name: 'Costillas de cerdo', price: 45.0, weight: '1 Lb', image: 'assets/layout/images/costillas_cerdo.jpg' },
  { name: 'Carne de res', price: 50.0, weight: '1 Lb', image: 'assets/layout/images/carne_res.jpg' },
  { name: 'Pollo fresco', price: 25.0, weight: '1 Lb', image: 'assets/layout/images/pollo_fresco.jpg' },
  { name: 'Costillas de cerdo', price: 45.0, weight: '1 Lb', image: 'assets/layout/images/costillas_cerdo.jpg' },
  { name: 'Carne de res', price: 50.0, weight: '1 Lb', image: 'assets/layout/images/carne_res.jpg' },
  { name: 'Pollo fresco', price: 25.0, weight: '1 Lb', image: 'assets/layout/images/pollo_fresco.jpg' },
  { name: 'Costillas de cerdo', price: 45.0, weight: '1 Lb', image: 'assets/layout/images/costillas_cerdo.jpg' },
  { name: 'Carne de res', price: 50.0, weight: '1 Lb', image: 'assets/layout/images/carne_res.jpg' },
  { name: 'Pollo fresco', price: 25.0, weight: '1 Lb', image: 'assets/layout/images/pollo_fresco.jpg' },
  { name: 'Costillas de cerdo', price: 45.0, weight: '1 Lb', image: 'assets/layout/images/costillas_cerdo.jpg' },
  { name: 'Carne de res', price: 50.0, weight: '1 Lb', image: 'assets/layout/images/carne_res.jpg' }
];

  filteredProducts: any[] = [...this.products]; // Inicialización correcta de productos filtrados

  constructor(
    private Router: Router,
    private ConsultaService: ConsultasService
  ) {}

  ngOnInit(): void {
    window.addEventListener('popstate', this.handlePopState.bind(this));
    if (!this.ConsultaService.isAuthenticated()) {
      this.Router.navigate(['auth', 'inicio'], { replaceUrl: true });
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('popstate', this.handlePopState.bind(this));
  }

  handlePopState(event: any): void {
    this.ConsultaService.logout();
    this.Router.navigate(['auth', 'inicio'], { replaceUrl: true });
  }

  // Búsqueda de productos
  searchProducts(term: string): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    this.currentPage = 1;
  }

  // Obtener productos paginados
  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Cambiar de página
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Cambiar la cantidad de productos por página
  changeItemsPerPage(value: string): void {
    this.itemsPerPage = +value;
    this.currentPage = 1;
  }

  // Total de páginas
  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}
