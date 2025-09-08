import { inject, Inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { FirestoreService } from '../../auth-firebase/firestore.service';
import { ScrumCard } from 'app/core/models/scrum-card.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ScrumCardsDataService extends BaseDataService<ScrumCard> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('scrum-cards');
    }
    
    public getAll(): Observable<ScrumCard[]> {
        return this._firestore.getAll<ScrumCard>(this.baseCollection);
    }
    public getItem(id: string): Observable<ScrumCard> {
        return this._firestore.getItem<ScrumCard>(this.baseCollection, id);
    }

    public updateItem(data: Partial<ScrumCard>): Observable<ScrumCard> {
        return this._firestore.updateItem<ScrumCard>(this.baseCollection, data.id, data);
    }
    
    public deleteItem(id: string): Observable<ScrumCard> {
        return this._firestore.deleteItem(this.baseCollection, id);
    }

    public createItem(data: ScrumCard): Observable<ScrumCard> {
        return this._firestore.createItem<ScrumCard>(this.baseCollection, data);
    }

    // public search(fieldName: string, value: string): Observable<ScrumCard[]> {
    //     return this._firestore.search<ScrumCard>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<ScrumCard[]>): Observable<void> {
    //     return this._firestore.bulkCreate<ScrumCard>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<ScrumCard[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<ScrumCard>(this.baseCollection, data);
    // }
}

