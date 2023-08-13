import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
formRegistro:FormGroup;
constructor(private formBuilder:FormBuilder){
  this.formRegistro=this.formBuilder.group({
    nombre:['',[Validators.required,Validators.minLength(3)]],
    apellido:['',[Validators.required,Validators.minLength(3)]],
    correo:['',[Validators.required,Validators.email]],
    contraseña:['',[Validators.required,Validators.minLength(6)]]
  })
}
};
