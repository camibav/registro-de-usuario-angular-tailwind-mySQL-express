import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routeAnimations } from './animation';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations('forward')]
})
export class AppComponent {

  title = 'registro-de-usuario-frontend';

  constructor(private router:Router) { }

  home() {
 this.router.navigate(['/']);

  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
