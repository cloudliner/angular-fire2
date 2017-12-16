import { Component, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Item {
  id:string,
  name:string
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let item of items | async">
        {{ item.name }}
      </li>
    </ul>
    <div>
      <input type="text" [(ngModel)]="name">
      <span (click)="addItem(name)">Add</span>
    </div>
  `
})
export class AppComponent {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  name: string;

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
  }

  addItem(name: string) {
    const id = this.afs.createId();
    const item: Item = { id, name }
    this.itemsCollection.add(item);
  }
}
