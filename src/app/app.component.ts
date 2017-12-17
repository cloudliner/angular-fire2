import { Component, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Item {
  name: string;
  test: string;
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let item of items | async">
        <span>{{ item.id }}</span> : 
        <span>{{ item.name }}</span> : 
        <span>{{ item.test }}</span>
        <button type="button" (click)="removeItem(item)">Remove</button>
      </li>
    </ul>
    <div>
      <label>name: </label>
      <input type="text" [(ngModel)]="newItem.name">
      <label>test: </label>
      <input type="text" [(ngModel)]="newItem.test">
      <button type="button" (click)="addItem(newItem)">Add</button>
    </div>
  `
})

export class AppComponent {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  newItem: Item = {
    name: '名称未設定',
    test: 'テスト',
  };
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges(['added', 'removed']);
  }
  addItem(item) {
    this.itemsCollection.add(item);
  }
  removeItem(item) {
    // どうやるの？
  }
}
