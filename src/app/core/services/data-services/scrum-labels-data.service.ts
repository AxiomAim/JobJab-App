import { inject, Inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { FirestoreService } from '../../auth-firebase/firestore.service';
import { ScrumLabel } from 'app/core/models/scrum-label.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ScrumLabelsDataService extends BaseDataService<ScrumLabel> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('scrum-labels');
    }
    
    public getAll(): Observable<ScrumLabel[]> {
        return this._firestore.getAll<ScrumLabel>(this.baseCollection);
    }
    public getItem(id: string): Observable<ScrumLabel> {
        return this._firestore.getItem<ScrumLabel>(this.baseCollection, id);
    }

    public updateItem(data: Partial<ScrumLabel>): Observable<ScrumLabel> {
        return this._firestore.updateItem<ScrumLabel>(this.baseCollection, data.id, data);
    }
    
    public deleteItem(id: string): Observable<ScrumLabel> {
        return this._firestore.deleteItem(this.baseCollection, id);
    }

    public createItem(data: ScrumLabel): Observable<ScrumLabel> {
        return this._firestore.createItem<ScrumLabel>(this.baseCollection, data);
    }

    // public search(fieldName: string, value: string): Observable<ScrumLabel[]> {
    //     return this._firestore.search<ScrumLabel>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<ScrumLabel[]>): Observable<void> {
    //     return this._firestore.bulkCreate<ScrumLabel>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<ScrumLabel[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<ScrumLabel>(this.baseCollection, data);
    // }
}

