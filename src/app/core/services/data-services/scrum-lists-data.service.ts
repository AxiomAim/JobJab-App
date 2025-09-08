import { inject, Inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { FirestoreService } from '../../auth-firebase/firestore.service';
import { ScrumList } from 'app/core/models/scrum-list.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ScrumListsDataService extends BaseDataService<ScrumList> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('scrum-lists');
    }
    
    public getAll(): Observable<ScrumList[]> {
        return this._firestore.getAll<ScrumList>(this.baseCollection);
    }
    public getItem(id: string): Observable<ScrumList> {
        return this._firestore.getItem<ScrumList>(this.baseCollection, id);
    }

    public updateItem(data: Partial<ScrumList>): Observable<ScrumList> {
        return this._firestore.updateItem<ScrumList>(this.baseCollection, data.id, data);
    }
    
    public deleteItem(id: string): Observable<ScrumList> {
        return this._firestore.deleteItem(this.baseCollection, id);
    }

    public createItem(data: ScrumList): Observable<ScrumList> {
        return this._firestore.createItem<ScrumList>(this.baseCollection, data);
    }


    // public search(fieldName: string, value: string): Observable<ScrumList[]> {
    //     return this._firestore.search<ScrumList>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<ScrumList[]>): Observable<void> {
    //     return this._firestore.bulkCreate<ScrumList>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<ScrumList[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<ScrumList>(this.baseCollection, data);
    // }
}

