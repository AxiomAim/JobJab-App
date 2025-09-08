import { inject, Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { BaseDataService } from 'app/core/services/data-services/base-data.service';
import { FirestoreService } from 'app/core/auth-firebase/firestore.service';
import { WhereFilterOp } from 'firebase/firestore';
import { Image } from 'app/core/models/image.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ImagesDataService extends BaseDataService<Image> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('images');
    }
    
    public getAll(): Observable<Image[]> {
        const results =  this._firestore.getAll(this.baseCollection);
        return results

    }
    public getItem(id: string): Observable<Image> {
        return this._firestore.getItem(this.baseCollection, id);
    }

    // public updateItem(data: Partial<Item>): Observable<Item> {
    //     return this._firestore.updateItem<Item>(this.baseCollection, data.id, data);
    // }
    
    public updateItem(data: Partial<Image>): Observable<Image> {
        // Assuming 'id' is the primary key
        const { id, ...updateData } = data; 
        // Only update if there are actual changes
        if (Object.keys(updateData).length === 0) {
          return of(data as Image); // Or throw an error if this shouldn't happen
        }
      
        return this._firestore.updateItem<Image>(this.baseCollection, id, updateData);
      }
      
    // public deleteItem(id: string): Observable<Item> {
    //     return this._firestore.deleteItem(this.baseCollection, id);
    // }

    public deleteItem(id: string): Observable<Image> {
      // 1. Fetch the document before deleting
      return this._firestore.getItem(this.baseCollection, id).pipe(
        switchMap((document) => {
          if (document) { 
            // 2. Delete the document if it exists
            return this._firestore.deleteItem(this.baseCollection, id).pipe(
              map(() => document) // Return the deleted document
            );
          } else {
            // Handle the case where the document doesn't exist
            // You can throw an error, return an empty Observable, etc.
            throw new Error(`Image with ID ${id} not found`); 
          }
        })
      );
    }
        // public createItem(data: Item): Observable<Item> {
    //     return this._firestore.createItem<Item>(this.baseCollection, data);
    // }

    public createItem(data: Image): Observable<Image> {
        return this._firestore.createItem(this.baseCollection, data).pipe(take(1),
          tap((createdImage) => { 
            console.log('Item created successfully:', createdImage); 
          }),
          catchError((error) => {
            console.error('Error creating Item:', error);
            // Optional: Return an Observable with an error value or rethrow the error
            return of(null); // Or: throw error; 
          })
        );
      }


    public getQuery(fieldName: string, operator: WhereFilterOp, value: string): Observable<Image[]> {
        return this._firestore.getQuery(this.baseCollection, fieldName, operator, value);
    }

    // public search(fieldName: string, value: string): Observable<Item[]> {
    //     return this._firestore.search<Item>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<Item[]>): Observable<void> {
    //     return this._firestore.bulkCreate<Item>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<Item[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<Item>(this.baseCollection, data);
    // }
}

