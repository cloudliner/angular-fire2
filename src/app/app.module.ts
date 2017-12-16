import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

// Optional Module
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
// import { AngularFireDatabaseModule } from 'angularfire2/database'

// For Edit
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'Angular Fire2'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // AngularFireDatabaseModule
    FormsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
