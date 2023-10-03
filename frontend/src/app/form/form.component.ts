import { Component, Input, Output, EventEmitter, OnInit,NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ConectarService } from '../servicios/conectar.service';
import { AuthService } from '../servicios/auth.service';
import { Observable } from 'rxjs';

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
  @Input() button!: string;
  formValid: boolean = false;
  userId: number = 0

  constructor(private formBuilder: FormBuilder, private router: Router, private conectarService: ConectarService, private authService: AuthService, private ngZone:NgZone ) { }

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
    else if (campo === 'teléfono') {
      validators.push(Validators.minLength(10), Validators.pattern('[0-9]*'));
    }
    else if (campo === 'edad') {
      validators.push(Validators.minLength(2), Validators.pattern('[0-9]*'));
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
    else if (campo == 'edad') {
      return 'Ingrese su edad';
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
    if (campo == 'edad') {
      return 'number';
    }
    return 'text';
  }

  obtenerTextoDeButton(button: string): string {
    if (this.button == 'Registrarse') {
      return 'Registrarse';
    }
    if (this.button == 'Iniciar sesión') {
      return 'Iniciar sesión';
    }
    if (this.button == 'Actualizar perfil') {
      return 'Actualizar perfil';
    }
    return '';
  }

  crearUsuario(formCopy: any) {
    this.conectarService.registrarUsuario(formCopy.nombre, formCopy.apellido, formCopy.correo, formCopy.password).subscribe(
      (res) => {
        console.log(res.message);
      },
      (error) => {
        console.error('error al registrar usuario', error);
      }
    );
  }

  loginDeUsuario(formCopy: any): Observable<number> {
    return new Observable((observer) => {
      let updatedUserId: number; // Variable local para almacenar el valor actualizado

      this.conectarService.loginUsuario(formCopy.correo, formCopy.password).subscribe(
        (res) => {
          if (res.userId !== undefined) {
            updatedUserId = res.userId; // Almacena el valor actualizado en la variable local
            this.authService.login(); // Establecer autenticación
            this.userId = updatedUserId; // Asigna el valor actualizado al atributo this.userId
            this.router.navigate(['/perfil/' + updatedUserId]);
            observer.next(this.userId); // Emitir el valor actualizado
            observer.complete();
          } else {
            console.error('ID de usuario no está definido en la respuesta');
          }
        },
        (error) => {
          console.error('error al iniciar sesión usuario', error);
          observer.error(error);
        }
      );
    });
  }





  registrarDatosDelPerfilDelUsuario(formCopy: any) {
    if (this.userId === 0) {
      console.error('ID de usuario no está definido');
      return;
    }

    const edad = formCopy.edad;
    const telefono = formCopy.telefono;
    const foto = formCopy.foto;

    if (!edad || !telefono || !foto) {
      console.error('Faltan campos por llenar');
      return;
    }

    this.conectarService.registrarDatosDePerfil(this.userId, edad, telefono, foto).subscribe(
      (res) => {
        console.log(res.message);
        // Actualizar visualmente la página o redirigir a la página de perfil
      },
      (error) => {
        console.error('Error al registrar datos de perfil:', error);
        // Mostrar mensaje de error en la aplicación
      }
    );
    this.router.navigate(['/home']);
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
      if (this.router.url == '/login') {
        this.loginDeUsuario(formCopy).subscribe((userId) => {
          this.ngZone.run(
            ()=> {
              this.userId= userId}// Actualiza el valor de userId
          )


        });
      }

      if (this.router.url == '/perfil/' + this.userId) {
        console.log('/perfil/' + this.userId);
        // this.registrarDatosDelPerfilDelUsuario(formCopy); // Asegúrate de que esta línea no esté comentada
        console.log('datos registrados');
      }

      console.log(this.router.url == '/perfil/' + this.userId)
    }

    else {
      this.formValid = false;
      this.form.markAllAsTouched(); // Marcar todos los campos como "touched" para mostrar mensajes de error si es necesario


    }
  }
}
