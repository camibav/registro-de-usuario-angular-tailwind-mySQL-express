import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  formPerfil: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.formPerfil = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      teléfono: ['', Validators.required],
      foto: ['', Validators.required],
    })
  }
  handleFormSubmit(form: FormGroup) {


  }

}
