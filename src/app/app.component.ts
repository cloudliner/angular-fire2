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
    <h1>shirts</h1>
    <ul>
      <li *ngFor="let shirt of shirts | async">
        {{ shirt.name }} is {{ shirt.price }}
      </li>
    </ul>
    <div>
      <label>name: </label>
      <input type="text" [(ngModel)]="newShirt.name">
      <label>price: </label>
      <input type="number" [(ngModel)]="newShirt.price">
      <button type="button" (click)="addShirt(newShirt)">Add</button>
    </div>
    <h1>deposits</h1>
    <ul>
      <li *ngFor="let deposit of deposits | async">
        {{ deposit.description }} for {{ deposit.amount }}
      </li>
    </ul>
    <div>
      <label>description: </label>
      <input type="text" [(ngModel)]="newDeposit.description">
      <label>amount: </label>
      <input type="number" [(ngModel)]="newDeposit.amount">
      <button type="button" (click)="addDeposite(newDeposit)">Add</button>
    </div>
  `
})
export class AppComponent {
  private shirtCollection: AngularFirestoreCollection<Shirt>;
  shirts: Observable<ShirtId[]>;
  newShirt: Shirt = {
    name: '名称未設定',
    price: 0,
  };

  private depositCollection: AngularFirestoreCollection<AccountDeposit>;
  deposits: Observable<AccountDepoistId[]>;
  newDeposit: AccountDeposit = {
    description: '名称未設定',
    amount: 0,
  };


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

  addShirt(shirt) {
    this.shirtCollection.add(shirt);
  }

  addDeposite(deposit) {
    this.depositCollection.add(deposit);
  }
}
