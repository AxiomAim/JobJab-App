import { inject, Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { BaseDataService } from 'app/core/services/data-services/base-data.service';
import { FirestoreService } from 'app/core/auth-firebase/firestore.service';
import { WhereFilterOp } from 'firebase/firestore';
import { CsvMatrix } from 'app/core/models/csv-matrix.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class CsvMatricesDataService extends BaseDataService<CsvMatrix> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('csv-matrices');
    }
    
    public getAll(): Observable<CsvMatrix[]> {
        const results =  this._firestore.getAll<CsvMatrix>(this.baseCollection);
        return results

    }
    public getItem(id: string): Observable<CsvMatrix> {
        return this._firestore.getItem<CsvMatrix>(this.baseCollection, id);
    }

    // public updateItem(data: Partial<CsvMatrix>): Observable<CsvMatrix> {
    //     return this._firestore.updateItem<CsvMatrix>(this.baseCollection, data.id, data);
    // }
    
    public updateItem(data: Partial<CsvMatrix>): Observable<CsvMatrix> {
        // Assuming 'id' is the primary key
        const { id, ...updateData } = data; 
        // Only update if there are actual changes
        if (Object.keys(updateData).length === 0) {
          return of(data as CsvMatrix); // Or throw an error if this shouldn't happen
        }
      
        return this._firestore.updateItem<CsvMatrix>(this.baseCollection, id, updateData);
      }
      
    // public deleteItem(id: string): Observable<CsvMatrix> {
    //     return this._firestore.deleteItem(this.baseCollection, id);
    // }

    public deleteItem(id: string): Observable<CsvMatrix> {
      // 1. Fetch the document before deleting
      return this._firestore.getItem<CsvMatrix>(this.baseCollection, id).pipe(
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
        // public createItem(data: CsvMatrix): Observable<CsvMatrix> {
    //     return this._firestore.createItem<CsvMatrix>(this.baseCollection, data);
    // }

    public createItem(data: CsvMatrix): Observable<CsvMatrix> {
        return this._firestore.createItem<CsvMatrix>(this.baseCollection, data).pipe(
          tap((createdDocument) => { 
            console.log('CsvMatrix created successfully:', createdDocument); 
          }),
          catchError((error) => {
            console.error('Error creating CsvMatrix:', error);
            // Optional: Return an Observable with an error value or rethrow the error
            return of(null); // Or: throw error; 
          })
        );
      }


    public getQuery(fieldName: string, operator: WhereFilterOp, value: string): Observable<CsvMatrix[]> {
        return this._firestore.getQuery<CsvMatrix>(this.baseCollection, fieldName, operator, value);
    }

    // public search(fieldName: string, value: string): Observable<CsvMatrix[]> {
    //     return this._firestore.search<CsvMatrix>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<CsvMatrix[]>): Observable<void> {
    //     return this._firestore.bulkCreate<CsvMatrix>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<CsvMatrix[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<CsvMatrix>(this.baseCollection, data);
    // }
}

