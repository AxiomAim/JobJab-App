import { inject, Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { BaseDataService } from 'app/core/services/data-services/base-data.service';
import { FirestoreService } from 'app/core/auth-firebase/firestore.service';
import { WhereFilterOp } from 'firebase/firestore';
import { CloudStorage } from 'app/core/models/cloud-storage.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class CloudStoragesDataService extends BaseDataService<CloudStorage> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('cloud-storage');
    }
    
    public getAll(): Observable<CloudStorage[]> {
        const results =  this._firestore.getAll<CloudStorage>(this.baseCollection);
        return results

    }
    public getItem(id: string): Observable<CloudStorage> {
        return this._firestore.getItem<CloudStorage>(this.baseCollection, id);
    }

    // public updateItem(data: Partial<CloudStorage>): Observable<CloudStorage> {
    //     return this._firestore.updateItem<CloudStorage>(this.baseCollection, data.id, data);
    // }
    
    public updateItem(data: Partial<CloudStorage>): Observable<CloudStorage> {
        // Assuming 'id' is the primary key
        const { id, ...updateData } = data; 
        // Only update if there are actual changes
        if (Object.keys(updateData).length === 0) {
          return of(data as CloudStorage); // Or throw an error if this shouldn't happen
        }
      
        return this._firestore.updateItem<CloudStorage>(this.baseCollection, id, updateData);
      }
      
    // public deleteItem(id: string): Observable<CloudStorage> {
    //     return this._firestore.deleteItem(this.baseCollection, id);
    // }

    public deleteItem(id: string): Observable<CloudStorage> {
      // 1. Fetch the document before deleting
      return this._firestore.getItem<CloudStorage>(this.baseCollection, id).pipe(
        switchMap((document) => {
          if (document) { 
            // 2. Delete the document if it exists
            return this._firestore.deleteItem(this.baseCollection, id).pipe(
              map(() => document) // Return the deleted document
            );
          } else {
            // Handle the case where the document doesn't exist
            // You can throw an error, return an empty Observable, etc.
            throw new Error(`Document with ID ${id} not found`); 
          }
        })
      );
    }
        // public createItem(data: CloudStorage): Observable<CloudStorage> {
    //     return this._firestore.createItem<CloudStorage>(this.baseCollection, data);
    // }

    public createItem(data: CloudStorage): Observable<CloudStorage> {
        return this._firestore.createItem<CloudStorage>(this.baseCollection, data).pipe(
          tap((createdDocument) => { 
            console.log('CloudStorage created successfully:', createdDocument); 
          }),
          catchError((error) => {
            console.error('Error creating CloudStorage:', error);
            // Optional: Return an Observable with an error value or rethrow the error
            return of(null); // Or: throw error; 
          })
        );
      }


    public getQuery(fieldName: string, operator: WhereFilterOp, value: string): Observable<CloudStorage[]> {
        return this._firestore.getQuery<CloudStorage>(this.baseCollection, fieldName, operator, value);
    }

    // public search(fieldName: string, value: string): Observable<CloudStorage[]> {
    //     return this._firestore.search<CloudStorage>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<CloudStorage[]>): Observable<void> {
    //     return this._firestore.bulkCreate<CloudStorage>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<CloudStorage[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<CloudStorage>(this.baseCollection, data);
    // }
}

