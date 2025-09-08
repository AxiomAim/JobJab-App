import { inject, Inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { FirestoreService } from '../../auth-firebase/firestore.service';
import { ScrumMember } from 'app/core/models/scrum-member.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ScrumMEmbersDataService extends BaseDataService<ScrumMember> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('scrum-members');
    }
    
    public getAll(): Observable<ScrumMember[]> {
        return this._firestore.getAll<ScrumMember>(this.baseCollection);
    }
    public getItem(id: string): Observable<ScrumMember> {
        return this._firestore.getItem<ScrumMember>(this.baseCollection, id);
    }

    public updateItem(data: Partial<ScrumMember>): Observable<ScrumMember> {
        return this._firestore.updateItem<ScrumMember>(this.baseCollection, data.id, data);
    }
    
    public deleteItem(id: string): Observable<ScrumMember> {
        return this._firestore.deleteItem(this.baseCollection, id);
    }

    public createItem(data: ScrumMember): Observable<ScrumMember> {
        return this._firestore.createItem<ScrumMember>(this.baseCollection, data);
    }

    // public search(fieldName: string, value: string): Observable<ScrumMember[]> {
    //     return this._firestore.search<ScrumMember>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<ScrumMember[]>): Observable<void> {
    //     return this._firestore.bulkCreate<ScrumMember>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<ScrumMember[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<ScrumMember>(this.baseCollection, data);
    // }
}

