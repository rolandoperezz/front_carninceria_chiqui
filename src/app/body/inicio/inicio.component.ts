import { Component } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {




  constructor(    private Router : Router,
    private ConsultaService : ConsultasService,
private ActivatedRoute : ActivatedRoute,

    ) {

     }

  ngOnInit(): void {
    this.ConsultaService.isAuthenticated()
}


}
