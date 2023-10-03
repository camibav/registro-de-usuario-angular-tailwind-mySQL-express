import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './servicios/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Utiliza la suscripción al observable isAuthenticated$
    return this.authService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          // Redirige a la página de inicio de sesión si el usuario no está autenticado
          return this.router.parseUrl('/login');
        }
      })
    );
  }
}

