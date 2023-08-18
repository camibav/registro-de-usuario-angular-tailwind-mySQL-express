import { Component } from '@angular/core';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent {
  formInicioSesion:FormGroup;
  constructor(private formBuilder:FormBuilder,private router:Router){
    this.formInicioSesion=this.formBuilder.group({ })
  }
  handleFormSubmit(form: FormGroup) {



  }

}
