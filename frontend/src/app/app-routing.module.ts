import { animation } from '@angular/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: { animation: 'forward' } },
  { path: 'home', component: HomeComponent, data: { animation: 'home' }},
  { path: 'registro', component: RegistroComponent, data: { animation: 'registro' } },
  { path: 'login', component: InicioSesionComponent, data: { animation: 'login' } },
  { path: 'perfil/:id', component: PerfilComponent, canActivate: [AuthGuard], data: { animation: 'perfil' } },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
