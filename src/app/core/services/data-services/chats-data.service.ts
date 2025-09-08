import { inject, Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { BaseDataService } from 'app/core/services/data-services/base-data.service';
import { FirestoreService } from 'app/core/auth-firebase/firestore.service';
import { WhereFilterOp } from 'firebase/firestore';
import { Chat } from 'app/modules/davesa/apps/chat/chat.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ChatsDataService extends BaseDataService<Chat> {
    _firestore = inject(FirestoreService)

    constructor(

    ) {
        super('chats');
    }
    
    public getAll(): Observable<Chat[]> {
        const results =  this._firestore.getAll<Chat>(this.baseCollection);
        return results

    }
    public getItem(id: string): Observable<Chat> {
        return this._firestore.getItem<Chat>(this.baseCollection, id);
    }

    // public updateItem(data: Partial<Chat>): Observable<Chat> {
    //     return this._firestore.updateItem<Chat>(this.baseCollection, data.id, data);
    // }
    
    public updateItem(data: Partial<Chat>): Observable<Chat> {
        // Assuming 'id' is the primary key
        const { id, ...updateData } = data; 
        // Only update if there are actual changes
        if (Object.keys(updateData).length === 0) {
          return of(data as Chat); // Or throw an error if this shouldn't happen
        }
      
        return this._firestore.updateItem<Chat>(this.baseCollection, id, updateData);
      }
      
    // public deleteItem(id: string): Observable<Chat> {
    //     return this._firestore.deleteItem(this.baseCollection, id);
    // }

    public deleteItem(id: string): Observable<Chat> {
      // 1. Fetch the document before deleting
      return this._firestore.getItem<Chat>(this.baseCollection, id).pipe(
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
        // public createItem(data: Chat): Observable<Chat> {
    //     return this._firestore.createItem<Chat>(this.baseCollection, data);
    // }

    public createItem(data: Chat): Observable<Chat> {
        return this._firestore.createItem<Chat>(this.baseCollection, data).pipe(
          tap((createdDocument) => { 
            console.log('Chat created successfully:', createdDocument); 
          }),
          catchError((error) => {
            console.error('Error creating Chat:', error);
            // Optional: Return an Observable with an error value or rethrow the error
            return of(null); // Or: throw error; 
          })
        );
      }


    public getQuery(fieldName: string, operator: WhereFilterOp, value: string): Observable<Chat[]> {
        return this._firestore.getQuery<Chat>(this.baseCollection, fieldName, operator, value);
    }

    // public search(fieldName: string, value: string): Observable<Chat[]> {
    //     return this._firestore.search<Chat>(this.baseCollection, fieldName, value);
    // }

    // public bulkCreate(data: Partial<Chat[]>): Observable<void> {
    //     return this._firestore.bulkCreate<Chat>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<Chat[]>): Observable<void> {
    //     return this._firestore.bulkUpdate<Chat>(this.baseCollection, data);
    // }
}

