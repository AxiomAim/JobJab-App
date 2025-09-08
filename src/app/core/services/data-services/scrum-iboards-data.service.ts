import { inject, Inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { FirestoreService } from '../../auth-firebase/firestore.service';
import { ScrumIBoardDto } from 'app/core/models/scrum-iboard.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ScrumIBoardDataService extends BaseDataService<ScrumIBoardDto> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('scrum-iboards');
    }
    
    public getAll(): Observable<ScrumIBoardDto[]> {
        return this._firestore.getAll<ScrumIBoardDto>(this.baseCollection);
    }
    public getItem(id: string): Observable<ScrumIBoardDto> {
        return this._firestore.getItem<ScrumIBoardDto>(this.baseCollection, id);
    }

    public updateItem(data: Partial<ScrumIBoardDto>): Observable<ScrumIBoardDto> {
        return this._firestore.updateItem<ScrumIBoardDto>(this.baseCollection, data.id, data);
    }
    
    public deleteItem(id: string): Observable<ScrumIBoardDto> {
        return this._firestore.deleteItem(this.baseCollection, id);
    }

    public createItem(data: ScrumIBoardDto): Observable<ScrumIBoardDto> {
        return this._firestore.createItem<ScrumIBoardDto>(this.baseCollection, data);
    }

    // public search(fieldName: string, value: string): Observable<ScrumIBoardDto[]> {
    //     return this._firestore.search<ScrumIBoardDto>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<ScrumIBoardDto[]>): Observable<void> {
    //     return this._firestore.bulkCreate<ScrumIBoardDto>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<ScrumIBoardDto[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<ScrumIBoardDto>(this.baseCollection, data);
    // }
}

