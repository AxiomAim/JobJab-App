import { inject, Inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { FirestoreService } from '../../auth-firebase/firestore.service';
import { ScrumILabelDto } from 'app/core/models/scrum-ilabel.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ScrumILabelDataService extends BaseDataService<ScrumILabelDto> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('scrum-ilabels');
    }
    
    public getAll(): Observable<ScrumILabelDto[]> {
        return this._firestore.getAll<ScrumILabelDto>(this.baseCollection);
    }
    public getItem(id: string): Observable<ScrumILabelDto> {
        return this._firestore.getItem<ScrumILabelDto>(this.baseCollection, id);
    }

    public updateItem(data: Partial<ScrumILabelDto>): Observable<ScrumILabelDto> {
        return this._firestore.updateItem<ScrumILabelDto>(this.baseCollection, data.id, data);
    }
    
    public deleteItem(id: string): Observable<ScrumILabelDto> {
        return this._firestore.deleteItem(this.baseCollection, id);
    }

    public createItem(data: ScrumILabelDto): Observable<ScrumILabelDto> {
        return this._firestore.createItem<ScrumILabelDto>(this.baseCollection, data);
    }

    // public search(fieldName: string, value: string): Observable<ScrumILabelDto[]> {
    //     return this._firestore.search<ScrumILabelDto>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<ScrumILabelDto[]>): Observable<void> {
    //     return this._firestore.bulkCreate<ScrumILabelDto>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<ScrumILabelDto[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<ScrumILabelDto>(this.baseCollection, data);
    // }
}

