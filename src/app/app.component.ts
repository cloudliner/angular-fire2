import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Item {
  name:string
}

interface Task {
  limit:Date
}

@Component({
  selector: 'app-root',
  template: `
    <div>
      {{ (item | async)?.name }}
    </div>
    <div>
      <li class="text" *ngFor="let task of tasks | async">
        {{ task.limit }}
      </li>
    </div>
  `
})
export class AppComponent {
  itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;
  tasks: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.itemDoc = afs.doc<Item>('items/1');
    this.item = this.itemDoc.valueChanges();
    this.tasks = this.itemDoc.collection<Task>('tasks').valueChanges();
  }
  update(item: Item) {
    this.itemDoc.update(item);
  }
}
