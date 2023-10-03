import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroComponent } from './registro/registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { ConectarService } from './servicios/conectar.service';
import { AuthService } from './servicios/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    InicioSesionComponent,
    PerfilComponent,
    FormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule, // Agrega RouterModule a los imports
    CommonModule,
  ],
  providers: [
    ConectarService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
