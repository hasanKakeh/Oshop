import { Injectable } from '@angular/core';

import { User } from 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AppUser } from './model/app-user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}
  save(user: User) {
    this.db
      .object('/user/' + user.uid)
      .update({ name: user.displayName, email: user.email });
  }
  get(uid: string):Observable<AppUser>{
    return this.db.object<AppUser>('/user/'+uid).valueChanges()
  
  }
}
