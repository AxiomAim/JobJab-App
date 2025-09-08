import { inject, Inject, Injectable } from '@angular/core';
import { catchError, concatMap, finalize, from, map, Observable, ObservableInput, of, switchMap, tap } from 'rxjs';
import { BaseDataService } from 'app/core/services/data-services/base-data.service';
import { FirestoreService } from 'app/core/auth-firebase/firestore.service';
import { WhereFilterOp } from 'firebase/firestore';
import { CsvRequirement } from 'app/modules/davesa/csv/csv-requirement.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class CsvSystemRequirementsUniqueDataService extends BaseDataService<CsvRequirement> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('csv-system-requirements-unique');
    }
    
    public getAll(): Observable<CsvRequirement[]> {
        const results =  this._firestore.getAll<CsvRequirement>(this.baseCollection);
        return results

    }
    public getItem(id: string): Observable<CsvRequirement> {
        return this._firestore.getItem<CsvRequirement>(this.baseCollection, id);
    }

    // public updateItem(data: Partial<CsvRequirement>): Observable<CsvRequirement> {
    //     return this._firestore.updateItem<CsvRequirement>(this.baseCollection, data.id, data);
    // }
    
    // public updateItem(data: Partial<CsvRequirement>): Observable<CsvRequirement> {
    //     // Assuming 'id' is the primary key
    //     const { id, ...updateData } = data; 
    //     // Only update if there are actual changes
    //     if (Object.keys(updateData).length === 0) {
    //       return of(data as CsvRequirement); // Or throw an error if this shouldn't happen
    //     }
      
    //     return this._firestore.updateItem<CsvRequirement>(this.baseCollection, id, updateData);
    //   }
      
    public updateItem(data: Partial<CsvRequirement>): Observable<CsvRequirement> {
      const { id, ...updateData } = data;
      if (Object.keys(updateData).length === 0) {
        return of(data as CsvRequirement);
      }
  
      return this._firestore.updateItem<CsvRequirement>(this.baseCollection, id, updateData);
    }

    // public deleteItem(id: string): Observable<CsvRequirement> {
    //     return this._firestore.deleteItem(this.baseCollection, id);
    // }

    public deleteItem(id: string): Observable<CsvRequirement> {
      // 1. Fetch the document before deleting
      return this._firestore.getItem<CsvRequirement>(this.baseCollection, id).pipe(
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
        // public createItem(data: CsvRequirement): Observable<CsvRequirement> {
    //     return this._firestore.createItem<CsvRequirement>(this.baseCollection, data);
    // }

    public createItem(data: CsvRequirement): Observable<CsvRequirement> {
        return this._firestore.createItem<CsvRequirement>(this.baseCollection, data).pipe(
          tap((createdDocument) => { 
            console.log('CsvRequirement created successfully:', createdDocument); 
          }),
          catchError((error) => {
            console.error('Error creating CsvRequirement:', error);
            // Optional: Return an Observable with an error value or rethrow the error
            return of(null); // Or: throw error; 
          })
        );
      }


    public getQuery(fieldName: string, operator: WhereFilterOp, value: string): Observable<CsvRequirement[]> {
        return this._firestore.getQuery<CsvRequirement>(this.baseCollection, fieldName, operator, value);
    }

    public refactorSignatures(): Observable<unknown> { // Return an Observable
      let processing = true;
  
      return this.getAll().pipe( // Return the Observable from this.getAll().pipe(...)
        switchMap((signatures: any) => {
          const updateObservables = signatures.map(signature => {
            signature.userId = signature.signatureUser.id;
            return this.updateItem(signature);
          });
  
          // return from(updateObservables).pipe(
          //   concatMap(observable => observable)
          // );

          return from(updateObservables as ObservableInput<any>).pipe(
            concatMap(observable => observable)
          );
        }),
        finalize(() => {
          processing = false;
          console.log('Refactoring complete!');
        }),
        catchError(error => {
          console.error('Error refactoring signatures:', error);
          processing = false;
          return of([]); // Return an empty array in case of error
        })
      );
    }
    // public search(fieldName: string, value: string): Observable<CsvRequirement[]> {
    //     return this._firestore.search<CsvRequirement>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<CsvRequirement[]>): Observable<void> {
    //     return this._firestore.bulkCreate<CsvRequirement>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<CsvRequirement[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<CsvRequirement>(this.baseCollection, data);
    // }
}

