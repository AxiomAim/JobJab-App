import { inject, Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { BaseDataService } from 'app/core/services/data-services/base-data.service';
import { FirestoreService } from 'app/core/auth-firebase/firestore.service';
import { CsvDocument } from 'app/core/models/csv-document.model';
import { WhereFilterOp } from 'firebase/firestore';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class CsvDocumentsDataService extends BaseDataService<CsvDocument> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('csv-documents');
    }
    
    public getAll(): Observable<CsvDocument[]> {
        const results =  this._firestore.getAll<CsvDocument>(this.baseCollection);
        return results

    }
    public getItem(id: string): Observable<CsvDocument> {
        return this._firestore.getItem<CsvDocument>(this.baseCollection, id);
    }

    // public updateItem(data: Partial<CsvDocument>): Observable<CsvDocument> {
    //     return this._firestore.updateItem<CsvDocument>(this.baseCollection, data.id, data);
    // }
    
    public updateItem(data: Partial<CsvDocument>): Observable<CsvDocument> {
        // Assuming 'id' is the primary key
        const { id, ...updateData } = data; 
        // Only update if there are actual changes
        if (Object.keys(updateData).length === 0) {
          return of(data as CsvDocument); // Or throw an error if this shouldn't happen
        }
      
        return this._firestore.updateItem<CsvDocument>(this.baseCollection, id, updateData);
      }
      
    // public deleteItem(id: string): Observable<CsvDocument> {
    //     return this._firestore.deleteItem(this.baseCollection, id);
    // }

    public deleteItem(id: string): Observable<CsvDocument> {
      // 1. Fetch the document before deleting
      return this._firestore.getItem<CsvDocument>(this.baseCollection, id).pipe(
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
        // public createItem(data: CsvDocument): Observable<CsvDocument> {
    //     return this._firestore.createItem<CsvDocument>(this.baseCollection, data);
    // }

    public createItem(data: CsvDocument): Observable<CsvDocument> {
        return this._firestore.createItem<CsvDocument>(this.baseCollection, data).pipe(
          tap((createdDocument) => { 
            console.log('CsvDocument created successfully:', createdDocument); 
          }),
          catchError((error) => {
            console.error('Error creating CsvDocument:', error);
            // Optional: Return an Observable with an error value or rethrow the error
            return of(null); // Or: throw error; 
          })
        );
      }


    public getQuery(fieldName: string, operator: WhereFilterOp, value: string): Observable<CsvDocument[]> {
        return this._firestore.getQuery<CsvDocument>(this.baseCollection, fieldName, operator, value);
    }

    // public search(fieldName: string, value: string): Observable<CsvDocument[]> {
    //     return this._firestore.search<CsvDocument>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<CsvDocument[]>): Observable<void> {
    //     return this._firestore.bulkCreate<CsvDocument>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<CsvDocument[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<CsvDocument>(this.baseCollection, data);
    // }
}

