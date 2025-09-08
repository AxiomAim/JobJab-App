import { inject, Inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { FirestoreService } from '../../auth-firebase/firestore.service';
import { ScrumICardDto } from 'app/core/models/scrum-icard.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ScrumICardDataService extends BaseDataService<ScrumICardDto> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('scrum-icards');
    }
    
    public getAll(): Observable<ScrumICardDto[]> {
        return this._firestore.getAll<ScrumICardDto>(this.baseCollection);
    }
    public getItem(id: string): Observable<ScrumICardDto> {
        return this._firestore.getItem<ScrumICardDto>(this.baseCollection, id);
    }

    public updateItem(data: Partial<ScrumICardDto>): Observable<ScrumICardDto> {
        return this._firestore.updateItem<ScrumICardDto>(this.baseCollection, data.id, data);
    }
    
    public deleteItem(id: string): Observable<ScrumICardDto> {
        return this._firestore.deleteItem(this.baseCollection, id);
    }

    public createItem(data: ScrumICardDto): Observable<ScrumICardDto> {
        return this._firestore.createItem<ScrumICardDto>(this.baseCollection, data);
    }

    // public search(fieldName: string, value: string): Observable<ScrumICardDto[]> {
    //     return this._firestore.search<ScrumICardDto>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<ScrumICardDto[]>): Observable<void> {
    //     return this._firestore.bulkCreate<ScrumICardDto>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<ScrumICardDto[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<ScrumICardDto>(this.baseCollection, data);
    // }
}

