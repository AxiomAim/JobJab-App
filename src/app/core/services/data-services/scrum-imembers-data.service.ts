import { inject, Inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { FirestoreService } from '../../auth-firebase/firestore.service';
import { ScrumIMemberDto } from 'app/core/models/scrum-imember.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ScrumIMemberDataService extends BaseDataService<ScrumIMemberDto> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('scrum-imembers');
    }
    
    public getAll(): Observable<ScrumIMemberDto[]> {
        return this._firestore.getAll<ScrumIMemberDto>(this.baseCollection);
    }
    public getItem(id: string): Observable<ScrumIMemberDto> {
        return this._firestore.getItem<ScrumIMemberDto>(this.baseCollection, id);
    }

    public updateItem(data: Partial<ScrumIMemberDto>): Observable<ScrumIMemberDto> {
        return this._firestore.updateItem<ScrumIMemberDto>(this.baseCollection, data.id, data);
    }
    
    public deleteItem(id: string): Observable<ScrumIMemberDto> {
        return this._firestore.deleteItem(this.baseCollection, id);
    }

    public createItem(data: ScrumIMemberDto): Observable<ScrumIMemberDto> {
        return this._firestore.createItem<ScrumIMemberDto>(this.baseCollection, data);
    }

    // public search(fieldName: string, value: string): Observable<ScrumIMemberDto[]> {
    //     return this._firestore.search<ScrumIMemberDto>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<ScrumIMemberDto[]>): Observable<void> {
    //     return this._firestore.bulkCreate<ScrumIMemberDto>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<ScrumIMemberDto[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<ScrumIMemberDto>(this.baseCollection, data);
    // }
}

