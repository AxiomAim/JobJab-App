import { inject, Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { BaseDataService } from 'app/core/services/data-services/base-data.service';
import { FirestoreQuery, FirestoreService } from 'app/core/auth-firebase/firestore.service';
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
import { ProjectTeam } from './project-teams.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ProductsDataService extends BaseDataService<ProjectTeam> {
    _firestore = inject(FirestoreService)

    constructor(
      public firestore: Firestore

    ) {
        super('products');
    }
    
    public getAll(): Observable<ProjectTeam[]> {
        return  this._firestore.getAll(this.baseCollection);
    }
    public getItem(id: string): Observable<ProjectTeam> {
        return this._firestore.getItem(this.baseCollection, id);
    }

    // public updateItem(data: Partial<Item>): Observable<Item> {
    //     return this._firestore.updateItem<Item>(this.baseCollection, data.id, data);
    // }
    
    public updateItem(data: Partial<ProjectTeam>): Observable<ProjectTeam> {
        // Assuming 'id' is the primary key
        const { id, ...updateData } = data; 
        // Only update if there are actual changes
        if (Object.keys(updateData).length === 0) {
          return of(data as ProjectTeam); // Or throw an error if this shouldn't happen
        }
      
        return this._firestore.updateItem<ProjectTeam>(this.baseCollection, id, updateData);
      }
      
    // public deleteItem(id: string): Observable<Item> {
    //     return this._firestore.deleteItem(this.baseCollection, id);
    // }

    public deleteItem(id: string): Observable<ProjectTeam> {
      // 1. Fetch the document before deleting
      return this._firestore.getItem(this.baseCollection, id).pipe(
        map((item) => item as ProjectTeam),
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

    public createItem(data: ProjectTeam): Observable<ProjectTeam> {
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

    public getQuery(fieldName: string, operator: WhereFilterOp, value: string): Observable<ProjectTeam[]> {
        return this._firestore.getQuery(this.baseCollection, fieldName, operator, value);
    }

    public bulkCreate(data: Partial<ProjectTeam>[]): Observable<ProjectTeam[]> { 
      return this._firestore.bulkCreate<ProjectTeam>(this.baseCollection, data as ProjectTeam[]); 
    }

    public getQueryWhereclause(queries: FirestoreQuery[]): Observable<ProjectTeam[]> {
      return this._firestore.getQueryWhereclause<ProjectTeam>(this.baseCollection, queries);
  }


    public bulkUpdate(data: Partial<ProjectTeam>[]): Observable<ProjectTeam[]> { 
      return this._firestore.bulkUpdate<ProjectTeam>(this.baseCollection, data as ProjectTeam[]); 
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
      startAfterDoc?: ProjectTeam,
      orderByField?: string,
      orderByDirection: 'asc' | 'desc' = 'asc'
    ): Observable<{ data: ProjectTeam[]; lastDoc: ProjectTeam | null }> {
      return new Observable<{ data: ProjectTeam[]; lastDoc: ProjectTeam | null }>((observer) => {
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
            const data: ProjectTeam[] = [];
            let lastDoc: ProjectTeam | null = null;
  
            querySnapshot.forEach((doc) => {
              data.push(doc.data() as ProjectTeam);
              lastDoc = doc.data() as ProjectTeam; // Get the last document for next page
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
