import { Component, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface Shirt {
  name: string;
  price: number;
}

export interface ShirtId extends Shirt {
  id: string;
}

export interface AccountDeposit {
  description: string;
  amount: number;
}

export interface AccountDepoistId extends AccountDeposit {
  id: string;
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let shirt of shirts | async">
        {{ shirt.name }} is {{ shirt.price }}
      </li>
    </ul>
    <ul>
      <li *ngFor="let deposit of deposits | async">
        {{ deposit.description }} for {{ deposit.amount }}
      </li>
    </ul>
  `
})
export class AppComponent {
  private shirtCollection: AngularFirestoreCollection<Shirt>;
  shirts: Observable<ShirtId[]>;

  private depositCollection: AngularFirestoreCollection<AccountDeposit>;
  deposits: Observable<AccountDepoistId[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.shirtCollection = afs.collection<Shirt>('shirts');
    this.shirts = this.shirtCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Shirt;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    this.depositCollection = afs.collection<AccountDeposit>('deposits');
    this.deposits = this.depositCollection.stateChanges(['added'])
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as AccountDeposit;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }
}
