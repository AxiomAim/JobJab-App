import { inject, Inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BaseDataService } from 'app/core/services/data-services/base-data.service';
import { FirestoreService } from 'app/core/auth-firebase/firestore.service';
import { Category } from 'app/core/models/category.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class CategoriesDataService extends BaseDataService<Category> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('categories');
    }
    
    public getAll(): Observable<Category[]> {
        const results =  this._firestore.getAll<Category>(this.baseCollection);
        return results

    }
    public getItem(id: string): Observable<Category> {
        return this._firestore.getItem<Category>(this.baseCollection, id);
    }

    public updateItem(data: Partial<Category>): Observable<Category> {
        return this._firestore.updateItem<Category>(this.baseCollection, data.id, data);
    }
    
    public deleteItem(id: string): Observable<Category> {
        return this._firestore.deleteItem(this.baseCollection, id);
    }

    public createItem(data: Category): Observable<Category> {
        return this._firestore.createItem<Category>(this.baseCollection, data);
    }

    // public search(fieldName: string, value: string): Observable<Category[]> {
    //     return this._firestore.search<Category>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<Category[]>): Observable<void> {
    //     return this._firestore.bulkCreate<Category>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<Category[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<Category>(this.baseCollection, data);
    // }
}

