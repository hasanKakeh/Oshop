import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.appUser$.pipe(map(user=>user.isAdmin))
        
       
    
  
  }
  constructor(
    private authService: AuthService

  ) {}
}
