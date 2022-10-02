import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { GoogleAuthProvider } from "firebase/auth";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth:AngularFireAuth) { }

  ngOnInit(): void {
  }
login(){
this.afAuth.signInWithRedirect( new GoogleAuthProvider()
)
}
}
