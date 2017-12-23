import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  template: `
  <div *ngIf="afAuth.authState | async; let user; else showLogin">
    <h1>Hello {{ user.displayName }}!</h1>
    <button (click)="logout()">Logout</button>
  </div>
  <ng-template #showLogin>
    <p>Please login.</p>
    <button (click)="login()">Login with Google</button>
  </ng-template>
  `
})
export class AppComponent {
  constructor(public afAuth: AngularFireAuth) {
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
