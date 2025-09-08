import { inject, Inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { FirestoreService } from '../../auth-firebase/firestore.service';
import { ScrumBoard } from 'app/core/models/scrum-board.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ScrumBoardsDataService extends BaseDataService<ScrumBoard> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('scrum-boards');
    }
    
    public getAll(): Observable<ScrumBoard[]> {
        return this._firestore.getAll<ScrumBoard>(this.baseCollection);
    }
    public getItem(id: string): Observable<ScrumBoard> {
        return this._firestore.getItem<ScrumBoard>(this.baseCollection, id);
    }

    public updateItem(data: Partial<ScrumBoard>): Observable<ScrumBoard> {
        return this._firestore.updateItem<ScrumBoard>(this.baseCollection, data.id, data);
    }
    
    public deleteItem(id: string): Observable<ScrumBoard> {
        return this._firestore.deleteItem(this.baseCollection, id);
    }

    public createItem(data: ScrumBoard): Observable<ScrumBoard> {
        return this._firestore.createItem<ScrumBoard>(this.baseCollection, data);
    }

    // public search(fieldName: string, value: string): Observable<ScrumBoard[]> {
    //     return this._firestore.search<ScrumBoard>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<ScrumBoard[]>): Observable<void> {
    //     return this._firestore.bulkCreate<ScrumBoard>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<ScrumBoard[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<ScrumBoard>(this.baseCollection, data);
    // }
}

