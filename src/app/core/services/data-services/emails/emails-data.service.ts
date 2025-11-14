import { inject, Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { BaseDataService } from 'app/core/services/data-services/base-data.service';
// import { getDocs, limit, orderBy, query, startAfter, WhereFilterOp } from 'firebase/firestore';
import { 
  getDocs,
  limit,
  orderBy,
  startAfter,
  Firestore, 
  collection, 
  query, 
  WhereFilterOp
} from '@angular/fire/firestore';
import { FirestoreQuery, FirestoreV2Service } from 'app/core/auth-firebase/firestore-v2.service';
import { Email } from './emails.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class EmailsDataService extends BaseDataService<Email> {
    _firestore = inject(FirestoreV2Service)

    constructor(
      public firestore: Firestore

    ) {
        super('emails');
    }
    
    public getAll(orgId: string): Observable<Email[]> {
        return  this._firestore.getAll(orgId, this.baseCollection);
    }
    public getItem(id: string): Observable<Email> {
        return this._firestore.getItem(this.baseCollection, id);
    }

    // public updateItem(data: Partial<Item>): Observable<Item> {
    //     return this._firestore.updateItem<Item>(this.baseCollection, data.id, data);
    // }
    
    public updateItem(data: Partial<Email>): Observable<Email> {
      console.log("updateItem:data", data);
        // Assuming 'id' is the primary key
        const { id, ...updateData } = data; 
        // Only update if there are actual changes
        if (Object.keys(updateData).length === 0) {
          return of(data as Email); // Or throw an error if this shouldn't happen
        }
      
        return this._firestore.updateItem<Email>(this.baseCollection, id, updateData);
      }
      
    // public deleteItem(id: string): Observable<Item> {
    //     return this._firestore.deleteItem(this.baseCollection, id);
    // }

    public deleteItem(id: string): Observable<Email> {
      // 1. Fetch the document before deleting
      return this._firestore.getItem(this.baseCollection, id).pipe(
        map((item) => item as Email),
        switchMap((document) => {
          if (document) { 
            // 2. Delete the document if it exists
            return this._firestore.deleteItem(this.baseCollection, id).pipe(
              map(() => document) // Return the deleted document
            );
          } else {
            // Handle the case where the document doesn't exist
            // You can throw an error, return an empty Observable, etc.
            throw new Error(`Product with ID ${id} not found`); 
          }
        })
      );
    }
        // public createItem(data: Item): Observable<Item> {
    //     return this._firestore.createItem<Item>(this.baseCollection, data);
    // }

    public createItem(data: Email): Observable<Email> {
        return this._firestore.createItem(this.baseCollection, data).pipe(take(1),
          tap((createdProduct) => { 
            console.log('Item created successfully:', createdProduct); 
          }),
          catchError((error) => {
            console.error('Error creating Item:', error);
            // Optional: Return an Observable with an error value or rethrow the error
            return of(null); // Or: throw error; 
          })
        );
      }

    public getQuery(fieldName: string, operator: WhereFilterOp, value: string): Observable<Email[]> {
        return this._firestore.getQuery(this.baseCollection, fieldName, operator, value);
    }

    public bulkCreate(data: Partial<Email>[]): Observable<Email[]> { 
      return this._firestore.bulkCreate<Email>(this.baseCollection, data as Email[]); 
    }

    public getQueryWhereclause(queries: FirestoreQuery[]): Observable<Email[]> {
      return this._firestore.getQueryWhereclause<Email>(this.baseCollection, queries);
  }


    public bulkUpdate(data: Partial<Email>[]): Observable<Email[]> { 
      return this._firestore.bulkUpdate<Email>(this.baseCollection, data as Email[]); 
    }

    public bulkDelete(ids: string[]) { 
      return this._firestore.bulkDelete(this.baseCollection, ids); 
    }

  /**
   * Gets a page of Products.
   *
   * @param pageSize The number of items per page.
   * @param startAfterDoc Optional. A document to start after (for pagination).
   * @param orderByField Optional. The field to order by.
   * @param orderByDirection Optional. The order direction ('asc' or 'desc').
   */
    public getPaged(
      pageSize: number,
      startAfterDoc?: Email,
      orderByField?: string,
      orderByDirection: 'asc' | 'desc' = 'asc'
    ): Observable<{ data: Email[]; lastDoc: Email | null }> {
      return new Observable<{ data: Email[]; lastDoc: Email | null }>((observer) => {
        const collectionRef = collection(this.firestore, this.baseCollection);
        let q = query(collectionRef, limit(pageSize));
  
        if (orderByField) {
          q = query(q, orderBy(orderByField, orderByDirection));
        }
  
        if (startAfterDoc) {
          q = query(q, startAfter(startAfterDoc));
        }
  
        getDocs(q)
          .then((querySnapshot) => {
            const data: Email[] = [];
            let lastDoc: Email | null = null;
  
            querySnapshot.forEach((doc) => {
              data.push(doc.data() as Email);
              lastDoc = doc.data() as Email; // Get the last document for next page
            });
  
            observer.next({ data, lastDoc });
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      });
    }

}
