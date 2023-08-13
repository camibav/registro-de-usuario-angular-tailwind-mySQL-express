import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() form!: FormGroup; // <--- Input() decorador indica que la propiedad de formulario se pasa a este componente desde el componente principal.
  @Input() campos!: string[]; // Agrega esta entrada de datos para que el componente de formulario sepa qué campos mostrar.

  constructor(private formBuilder: FormBuilder) {
    const camposPredeterminados = ['nombre', 'apellido', 'correo', 'contraseña']; // Campos para registro
    this.form = this.formBuilder.group({});

    // Si se proporcionan campos personalizados, úsalos

    const camposUtilizar = this.campos ? this.campos : camposPredeterminados;

    camposUtilizar.forEach(campo => {
      this.form.addControl(campo, this.formBuilder.control(''));
    });
  }
  obtenerTextoPlaceholder(campo: string): string {
    if (campo === 'nombre') {
      return 'Ingrese su nombre';
    } else if (campo === 'apellido') {
      return 'Ingrese su apellido';
    } else if (campo === 'correo') {
      return 'Ingrese su correo';
    } else if (campo === 'contraseña') {
      return 'Ingrese su contraseña';
    }
    return ''; // Devuelve una cadena vacía por defecto o maneja otros campos
  }
  obtenerTipoInput(campo: string): string {

    if (campo == 'correo') {
      return 'email';
    }
    if (campo == 'contraseña') {
      return 'password';
    }
    return 'text';
  }


  onSubmit() {
    console.log(this.form.value);
    console.log('FUNCIONA')
  }
}
