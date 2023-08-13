import { Component } from '@angular/core';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent {
  formInicioSesion:FormGroup;
  constructor(private formBuilder:FormBuilder){
    this.formInicioSesion=this.formBuilder.group({
      correo:['',[Validators.required,Validators.email]],
      contraseña:['',[Validators.required,Validators.minLength(6)]]
    })
  }
}
