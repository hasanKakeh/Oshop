import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import { user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PreviousRouteService } from './previous-route.service';
import { UserService } from './user.service';
import { AppUser } from './model/app-user.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private preRouteService: PreviousRouteService,
    private router: Router
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }
  logout() {
    this.router.navigate(['/login']);
    this.afAuth.signOut();
  }

  redirectRouteAfterLogin() {
    this.user$.subscribe((user) => {
      if (user) {
        this.userService.save(user);
        const url = this.preRouteService.getPreviousUrl();
        if (url) {
          this.router.navigate([url]);
          this.preRouteService.deletePreviousUrlKey();
        }
      }
    });
  }
  get appUser$():Observable<AppUser>{
    return this.user$.pipe(switchMap(user=>this.userService.get(user?.uid)))

  }
}
