import { Component, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface AccountLogItem {
  description: string;
  amount: number;
}

export interface AccountLogItemId extends AccountLogItem {
  id: string;
}

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let log of accountLogs | async">
        {{ log.description }} for {{ log.amount }}
      </li>
    </ul>
  `
})

export class AppComponent {
  private accountLogCollection: AngularFirestoreCollection<AccountLogItem>;
  accountLogs: Observable<AccountLogItemId[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.accountLogCollection = afs.collection<AccountLogItem>('accountLog');
    this.accountLogs = this.accountLogCollection.auditTrail()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as AccountLogItem;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }
}
