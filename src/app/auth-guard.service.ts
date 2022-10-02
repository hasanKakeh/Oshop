import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { PreviousRouteService } from './previous-route.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user$.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/login'], {
            queryParams: {
              redirectURL: state.url,
            },
          });
          this.preRouteService.setPreviousUrl(state.url);
          return false;
        }
        return true;
      })
    );
  }
  constructor(
    private authService: AuthService,
    private preRouteService: PreviousRouteService,
    private router: Router
  ) {}
}
