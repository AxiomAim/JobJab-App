import { inject, Inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BaseDataService } from 'app/core/services/data-services/base-data.service';
import { FirestoreService } from 'app/core/auth-firebase/firestore.service';
import { Tag } from 'app/core/models/tag.model';
import { WhereFilterOp } from 'firebase/firestore';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class TagsDataService extends BaseDataService<Tag> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('tags');
    }
    
    public getAll(): Observable<Tag[]> {
        const results =  this._firestore.getAll<Tag>(this.baseCollection);
        return results

    }
    public getItem(id: string): Observable<Tag> {
        return this._firestore.getItem<Tag>(this.baseCollection, id);
    }

    public updateItem(data: Partial<Tag>): Observable<Tag> {
        return this._firestore.updateItem<Tag>(this.baseCollection, data.id, data);
    }
    
    public deleteItem(id: string): Observable<Tag> {
        return this._firestore.deleteItem(this.baseCollection, id);
    }

    public createItem(data: Tag): Observable<Tag> {
        return this._firestore.createItem<Tag>(this.baseCollection, data);
    }

    public getQuery(fieldName: string, operator: WhereFilterOp, value: string): Observable<Tag[]> {
        return this._firestore.getQuery<Tag>(this.baseCollection, fieldName, operator, value);
    }

    // public search(fieldName: string, value: string): Observable<Tag[]> {
    //     return this._firestore.search<Tag>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<Tag[]>): Observable<void> {
    //     return this._firestore.bulkCreate<Tag>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<Tag[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<Tag>(this.baseCollection, data);
    // }
}

