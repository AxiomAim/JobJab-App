import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreCRUDService<T> {

  constructor(private firestore: AngularFirestore) { }

  /**
   * Creates a new document in the specified collection.
   * @param collectionName The name of the Firestore collection.
   * @param data The data to be stored in the new document.  Can be an object or a class instance.
   * @param docId (Optional) The ID for the new document. If not provided, Firestore will generate one.
   * @returns An Observable that emits the newly created document's reference.
   */
  createItem(collectionName: string, data: T, docId?: string): Observable<any> {
    const collectionRef = this.firestore.collection<T>(collectionName);
    const promise = docId ? collectionRef.doc(docId).set(data) : collectionRef.add(data);
    return from(promise); // Convert the promise to an observable
  }


  /**
   * Reads a document from the specified collection.
   * @param collectionName The name of the Firestore collection.
   * @param docId The ID of the document to retrieve.
   * @returns An Observable that emits the document data or null if the document doesn't exist.
   */
  getItem(collectionName: string, docId: string): Observable<T | undefined> {
    const docRef = this.firestore.collection<T>(collectionName).doc<T>(docId);
    return docRef.valueChanges(); // Use valueChanges() for real-time updates
  }

  /**
   * Updates a document in the specified collection.
   * @param collectionName The name of the Firestore collection.
   * @param docId The ID of the document to update.
   * @param data The updated data.
   * @returns An Observable that completes when the update is successful.
   */
  updateItem(collectionName: string, docId: string, data: Partial<T>): Observable<void> {  // Partial<T> allows for partial updates
    const docRef = this.firestore.collection<T>(collectionName).doc<T>(docId);
    return from(docRef.update(data));
  }

  /**
   * Deletes a document from the specified collection.
   * @param collectionName The name of the Firestore collection.
   * @param docId The ID of the document to delete.
   * @returns An Observable that completes when the deletion is successful.
   */
  deleteItem(collectionName: string, docId: string): Observable<void> {
    const docRef = this.firestore.collection(collectionName).doc(docId);
    return from(docRef.delete());
  }


  /**
   * Returns an Observable of all documents in the given collection.  Use with caution for large collections.
   * @param collectionName
   * @returns
   */
  getAll(collectionName: string): Observable<T[]> {
    const collectionRef = this.firestore.collection<T>(collectionName);
    return collectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as T;
        const id = a.payload.doc.id;
        return { id, ...data }; // Include the document ID in the returned data
      }))
    );
  }


  /**
   * Returns a collection reference for more complex queries.
   * @param collectionName
   * @returns
   */
  collectionRef(collectionName: string): AngularFirestoreCollection<T> {
    return this.firestore.collection<T>(collectionName);
  }

  /**
   * Returns a document reference for more complex operations.
   * @param collectionName
   * @param docId
   * @returns
   */
  docRef(collectionName: string, docId: string): AngularFirestoreDocument<T> {
    return this.firestore.collection<T>(collectionName).doc<T>(docId);
  }

}