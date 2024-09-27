import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validator,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  valCheck: string[] = ['remember'];

  password!: string;

  constructor(
    // private ConsultaService : CatalogosService,
    private ActivatedRoute : ActivatedRoute,
    private Router : Router,
    // private formBuilder : FormBuilder,private primengConfig: PrimeNGConfig,
    // private confirmationService: ConfirmationService, private messageService: MessageService,
    // private _ExportService: ExportService
 ) {
      
    }

    login(){
      this.Router.navigateByUrl('/auth/login');

    }
}
