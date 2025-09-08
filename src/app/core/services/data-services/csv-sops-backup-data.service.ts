import { inject, Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { BaseDataService } from 'app/core/services/data-services/base-data.service';
import { FirestoreService } from 'app/core/auth-firebase/firestore.service';
import { WhereFilterOp } from 'firebase/firestore';
import { CsvSop } from 'app/modules/davesa/csv/csv-sops/csv-sop.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class CsvSopsBackupDataService extends BaseDataService<CsvSop> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('csv-sops-backup');
    }
    
    public getAll(): Observable<CsvSop[]> {
        const results =  this._firestore.getAll<CsvSop>(this.baseCollection);
        return results

    }
    public getItem(id: string): Observable<CsvSop> {
        return this._firestore.getItem<CsvSop>(this.baseCollection, id);
    }

    // public updateItem(data: Partial<CsvSop>): Observable<CsvSop> {
    //     return this._firestore.updateItem<CsvSop>(this.baseCollection, data.id, data);
    // }
    
    public updateItem(data: Partial<CsvSop>): Observable<CsvSop> {
        // Assuming 'id' is the primary key
        const { id, ...updateData } = data; 
        // Only update if there are actual changes
        if (Object.keys(updateData).length === 0) {
          return of(data as CsvSop); // Or throw an error if this shouldn't happen
        }
      
        return this._firestore.updateItem<CsvSop>(this.baseCollection, id, updateData);
      }
      
    // public deleteItem(id: string): Observable<CsvSop> {
    //     return this._firestore.deleteItem(this.baseCollection, id);
    // }

    public deleteItem(id: string): Observable<CsvSop> {
      // 1. Fetch the document before deleting
      return this._firestore.getItem<CsvSop>(this.baseCollection, id).pipe(
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
        // public createItem(data: CsvSop): Observable<CsvSop> {
    //     return this._firestore.createItem<CsvSop>(this.baseCollection, data);
    // }

    public createItem(data: CsvSop): Observable<CsvSop> {
        return this._firestore.createItem<CsvSop>(this.baseCollection, data).pipe(
          tap((createdDocument) => { 
            console.log('CsvSop created successfully:', createdDocument); 
          }),
          catchError((error) => {
            console.error('Error creating CsvSop:', error);
            // Optional: Return an Observable with an error value or rethrow the error
            return of(null); // Or: throw error; 
          })
        );
      }


    public getQuery(fieldName: string, operator: WhereFilterOp, value: string): Observable<CsvSop[]> {
        return this._firestore.getQuery<CsvSop>(this.baseCollection, fieldName, operator, value);
    }

    // public search(fieldName: string, value: string): Observable<CsvSop[]> {
    //     return this._firestore.search<CsvSop>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<CsvSop[]>): Observable<void> {
    //     return this._firestore.bulkCreate<CsvSop>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<CsvSop[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<CsvSop>(this.baseCollection, data);
    // }
}

