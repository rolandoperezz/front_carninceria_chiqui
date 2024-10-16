import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validator,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

  constructor(
   private ConsultaService : ConsultasService,
    private ActivatedRoute : ActivatedRoute,
    private Router : Router,
    // private formBuilder : FormBuilder,private primengConfig: PrimeNGConfig,
    // private confirmationService: ConfirmationService, private messageService: MessageService,
    // private _ExportService: ExportService
 ) {
      
    }

    ngOnInit(): void {
     this.ConsultaService.logout()
 }


    login(){
      this.Router.navigate(['auth', 'login'], { replaceUrl: true });


    }

}
