
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ConectarService } from '../servicios/conectar.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() form!: FormGroup; // <--- Input() decorador indica que la propiedad de formulario se pasa a este componente desde el componente principal.
  @Input() campos!: string[]; // Agrega esta entrada de datos para que el componente de formulario sepa qué campos mostrar.
  @Input() titulo!: string; // Agrega esta entrada de datos para que el componente de formulario sepa qué título mostrar.
  @Output() formSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>(); // Output() decorador indica que el evento se emite desde este componente al componente padre.
  formValid: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private conectarService: ConectarService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    const camposPredeterminados = ['nombre', 'apellido', 'correo', 'password'];
    const camposUtilizar = this.campos ? this.campos : camposPredeterminados;

    camposUtilizar.forEach(campo => {
      this.form.addControl(campo, this.formBuilder.control('', this.obtenerValidatorParaCampo(campo)));
    });
  }

  obtenerValidatorParaCampo(campo: string): ValidatorFn[] {
    const validators: ValidatorFn[] = [Validators.required];

    if (campo === 'nombre' || campo === 'apellido') {
      validators.push(Validators.minLength(3), Validators.pattern('[a-zA-Z]*'));
    } else if (campo === 'correo') {
      validators.push(Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,3}$'));
    } else if (campo === 'password') {
      validators.push(Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*'));
    }

    return validators;
  }


  obtenerTextoPlaceholder(campo: string): string {
    if (campo === 'nombre') {
      return 'Ingrese su nombre';
    } else if (campo === 'apellido') {
      return 'Ingrese su apellido';
    } else if (campo === 'correo') {
      return 'Ingrese su correo';
    } else if (campo === 'password') {
      return 'Ingrese su contraseña';
    } else if (campo == 'teléfono') {
      return 'Ingrese su teléfono';
    } else if (campo == 'dirección') {
      return 'Ingrese su dirección';
    } else if (campo == 'foto') {
      return 'Ingrese su foto';

    }

    return ''; // Devuelve una cadena vacía por defecto o maneja otros campos
  }
  obtenerTipoInput(campo: string): string {

    if (campo == 'correo') {
      return 'email';
    }
    if (campo == 'password') {
      return 'password';
    }
    if (campo == 'foto') {
      return 'file';
    }
    return 'text';
  }

  crearUsuario(formCopy: any) {
    this.conectarService.registrarUsuario(formCopy.nombre, formCopy.apellido, formCopy.correo, formCopy.password).subscribe(
      (res) => {
        console.log(res.message);
      },
      (error) => {
        console.error('error al registrar usuario', error );
      }
    );
  }

  loginDeUsuario(formCopy: any){
 this.conectarService.loginUsuario(formCopy.correo, formCopy.password).subscribe(
      (res) => {
        console.log(res.message);
      },(error) => {
        console.error('error al iniciar sesión usuario', error );
      }

 )

  }



  onSubmit() {
    let formCopy = { ...this.form.value };
    if (this.form.valid) {
      this.formSubmitted.emit(formCopy); // Emite el evento cuando el formulario es válido
      this.formValid = true;
      this.form.reset(); // Restablece el formulario

      if (this.router.url == '/registro') {
        this.crearUsuario(formCopy);
        this.router.navigate(['/login']);
      }
      if(this.router.url == '/login'){
        this.loginDeUsuario(formCopy);
        this.router.navigate(['/perfil']);

      }


    }

    else {
      this.formValid=false;
      this.form.markAllAsTouched(); // Marcar todos los campos como "touched" para mostrar mensajes de error si es necesario


    }
  }
}
