import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Item {
  name:string
}

@Component({
  selector: 'app-root',
  template: `
    <div>
      {{ (item | async)?.name }}
    </div>
  `
})
export class AppComponent {
  itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;
  constructor(private afs: AngularFirestore) {
    this.itemDoc = afs.doc<Item>('items/uVBxzJMfc9qdm64rJFsC');
    this.item = this.itemDoc.valueChanges();
  }
  update(item: Item) {
    this.itemDoc.update(item);
  }
}
