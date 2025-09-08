import { inject, Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { BaseDataService } from 'app/core/services/data-services/base-data.service';
import { FirestoreService } from 'app/core/auth-firebase/firestore.service';
import { WhereFilterOp } from 'firebase/firestore';
import { User } from 'app/core/models/user.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class UsersBackupDataService extends BaseDataService<User> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('users-backup');
    }
    
    public getAll(): Observable<User[]> {
        const results =  this._firestore.getAll<User>(this.baseCollection);
        return results

    }
    public getItem(id: string): Observable<User> {
        return this._firestore.getItem<User>(this.baseCollection, id);
    }

    // public updateItem(data: Partial<User>): Observable<User> {
    //     return this._firestore.updateItem<User>(this.baseCollection, data.id, data);
    // }
    
    public updateItem(data: Partial<User>): Observable<User> {
        // Assuming 'id' is the primary key
        const { id, ...updateData } = data; 
        // Only update if there are actual changes
        if (Object.keys(updateData).length === 0) {
          return of(data as User); // Or throw an error if this shouldn't happen
        }
      
        return this._firestore.updateItem<User>(this.baseCollection, id, updateData);
      }
      
    // public deleteItem(id: string): Observable<User> {
    //     return this._firestore.deleteItem(this.baseCollection, id);
    // }

    public deleteItem(id: string): Observable<User> {
      // 1. Fetch the document before deleting
      return this._firestore.getItem<User>(this.baseCollection, id).pipe(
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

    public deleteDuplicates(): Observable<User> {
      // 1. Fetch the document before deleting
      return this._firestore.deleteDuplicates(this.baseCollection).pipe(
        map((document) => {
          return null
        })
      );
    }
  

    // public createItem(data: User): Observable<User> {
    //     return this._firestore.createItem<User>(this.baseCollection, data);
    // }

    public createItem(data: User): Observable<User> {
        return this._firestore.createItem<User>(this.baseCollection, data).pipe(
          tap((createdDocument) => { 
            console.log('User created successfully:', createdDocument); 
          }),
          catchError((error) => {
            console.error('Error creating User:', error);
            // Optional: Return an Observable with an error value or rethrow the error
            return of(null); // Or: throw error; 
          })
        );
      }


    public getQuery(fieldName: string, operator: WhereFilterOp, value: string): Observable<User[]> {
        return this._firestore.getQuery<User>(this.baseCollection, fieldName, operator, value);
    }

    // public search(fieldName: string, value: string): Observable<User[]> {
    //     return this._firestore.search<User>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<User[]>): Observable<void> {
    //     return this._firestore.bulkCreate<User>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<User[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<User>(this.baseCollection, data);
    // }

    
}

