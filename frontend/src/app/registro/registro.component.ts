import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  formRegistro: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.formRegistro = this.formBuilder.group({
    });
  }

  handleFormSubmit(form: FormGroup) {

  }

}
