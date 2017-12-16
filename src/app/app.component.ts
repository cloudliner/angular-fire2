import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Item {
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
  `
})
export class AppComponent {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
  }

  update(item: Item) {
    this.itemsCollection.add(item);
  }
}
