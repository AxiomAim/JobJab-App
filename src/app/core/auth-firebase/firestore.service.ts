import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, query, where, deleteDoc, addDoc, updateDoc, collectionData, getDoc, doc, setDoc, WhereFilterOp, docData, getDocs, writeBatch } from '@angular/fire/firestore';
import { BaseDatabaseModel } from '../models/base-dto.model';
import { catchError, forkJoin, from, map, Observable, of, switchMap, throwError } from 'rxjs';

export interface FirestoreQuery {
    field: string;
    operation: WhereFilterOp;
    searchKey: any;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);  // For runInInjectionContext

  getAll<T extends BaseDatabaseModel>(collectionPath: string): Observable<T[]> {
    const colRef = collection(this.firestore, collectionPath);
    const q = query(colRef, where('orgId', '==', 'default-org-id'));  // Replace with dynamic orgId
    const converter = {
      toFirestore: (data: T) => data,
      fromFirestore: (snap: any) => ({ id: snap.id, ...snap.data() } as T)
    };
    const qWithConverter = q.withConverter(converter);

    // Wrap in injection context
    return runInInjectionContext(this.injector, () => 
      collectionData<T>(qWithConverter).pipe(
        catchError(error => {
          console.error('Error fetching data:', error);
          return of([]);
        })
      )
    );
  }

  getItem<T extends BaseDatabaseModel>(collectionPath: string, id: string): Observable<T> {
    return runInInjectionContext(this.injector, () =>
      docData(doc(this.firestore, `${collectionPath}/${id}`), { idField: 'id' }).pipe(
        map(data => {
          if (data) {
            return data as T;
          }
          throw new Error(`Document not found at ${collectionPath}/${id}`);
        }),
        catchError(error => {
          console.error(`Error fetching document ${collectionPath}/${id}:`, error);
          return throwError(() => new Error(`Failed to fetch document: ${error.message}`));
        })
      )
    );
  }

  getQuery<T extends BaseDatabaseModel>(collectionPath: string, fieldName: string, operator: WhereFilterOp, value: string): Observable<T[]> {
    const colRef = collection(this.firestore, collectionPath);
    const q = query(colRef, where(fieldName, operator, value));
    const converter = {
      toFirestore: (data: T) => data,
      fromFirestore: (snap: any) => ({ id: snap.id, ...snap.data() } as T)
    };
    const qWithConverter = q.withConverter(converter);

    return runInInjectionContext(this.injector, () =>
      collectionData<T>(qWithConverter).pipe(
        catchError(error => {
          console.error('Error fetching data:', error);
          return of([]);
        })
      )
    );
  }

  getQueryWhereclause<T extends BaseDatabaseModel>(collectionPath: string, queries: FirestoreQuery[]): Observable<T[]> {
    const colRef = collection(this.firestore, collectionPath);
    const whereclause: any[] = [];
    queries.forEach(query => {
      const w = where(query.field, query.operation, query.searchKey);
      whereclause.push(w);
    });
    const q = query(colRef, ...whereclause);
    const converter = {
      toFirestore: (data: T) => data,
      fromFirestore: (snap: any) => ({ id: snap.id, ...snap.data() } as T)
    };
    const qWithConverter = q.withConverter(converter);

    return runInInjectionContext(this.injector, () =>
      collectionData<T>(qWithConverter).pipe(
        catchError(error => {
          console.error('Error fetching data:', error);
          return of([]);
        })
      )
    );
  }

  getCompoundQuery<T extends BaseDatabaseModel>(collectionPath: string, queryString: FirestoreQuery[]): Observable<T[]> {
    return this.getQueryWhereclause(collectionPath, queryString);
  }

  createItem<T extends BaseDatabaseModel>(collectionPath: string, data: Partial<T>): Observable<string> {
    const colRef = collection(this.firestore, collectionPath);
    return runInInjectionContext(this.injector, () =>
      from(addDoc(colRef, data as any)).pipe(
        map(ref => ref.id)
      )
    );
  }

  updateItem<T extends BaseDatabaseModel>(collectionPath: string, id: string, data: Partial<T>): Observable<T> {
    const docRef = doc(this.firestore, collectionPath, id);
    return runInInjectionContext(this.injector, () =>
      from(getDoc(docRef)).pipe(
        switchMap(docSnap => {
          if (docSnap.exists()) {
            const updatedData = { ...docSnap.data(), ...data } as any;
            return from(updateDoc(docRef, updatedData)).pipe(
              map(() => updatedData as T)
            );
          }
          throw new Error(`Document with ID ${id} not found`);
        })
      )
    );
  }

  deleteItem<T extends BaseDatabaseModel>(collectionPath: string, id: string): Observable<T> {
    const docRef = doc(this.firestore, collectionPath, id);
    return runInInjectionContext(this.injector, () =>
      from(getDoc(docRef)).pipe(
        switchMap(docSnap => {
          if (docSnap.exists()) {
            return from(deleteDoc(docRef)).pipe(
              map(() => ({ id: docSnap.id, ...docSnap.data() } as T))
            );
          }
          throw new Error(`Document with ID ${id} not found`);
        })
      )
    );
  }

  bulkCreate<T extends BaseDatabaseModel>(collectionPath: string, data: T[]): Observable<T[]> {
    const batchSize = 499;
    const batches: Observable<T[]>[] = [];
    for (let i = 0; i < data.length; i += batchSize) {
      const batchData = data.slice(i, i + batchSize);
      const batch = writeBatch(this.firestore);
      batchData.forEach(item => {
        let docRef;
        if (item.id) {
          docRef = doc(this.firestore, collectionPath, item.id);
        } else {
          docRef = doc(collection(this.firestore, collectionPath));
        }
        batch.set(docRef, item);
      });
      batches.push(
        runInInjectionContext(this.injector, () =>
          from(batch.commit()).pipe(
            map(() => batchData)
          )
        )
      );
    }
    return forkJoin(batches).pipe(
      map(results => results.flat())
    );
  }

  bulkUpdate<T extends BaseDatabaseModel>(collectionPath: string, data: T[]): Observable<T[]> {
    const batchSize = 499;
    const batches: Observable<T[]>[] = [];
    for (let i = 0; i < data.length; i += batchSize) {
      const batchData = data.slice(i, i + batchSize);
      const batch = writeBatch(this.firestore);
      batchData.forEach(item => {
        if (!item.id) {
          throw new Error('ID is required for bulkUpdate');
        }
        const docRef = doc(this.firestore, collectionPath, item.id);
        batch.update(docRef, { ...item } as any);
      });
      batches.push(
        runInInjectionContext(this.injector, () =>
          from(batch.commit()).pipe(
            map(() => batchData)
          )
        )
      );
    }
    return forkJoin(batches).pipe(
      map(results => results.flat())
    );
  }

  bulkDelete(collectionPath: string, ids: string[]): Observable<void> {
    const batchSize = 499;
    const batches: Observable<any>[] = [];
    for (let i = 0; i < ids.length; i += batchSize) {
      const batchIds = ids.slice(i, i + batchSize);
      const batch = writeBatch(this.firestore);
      batchIds.forEach(id => {
        const docRef = doc(this.firestore, collectionPath, id);
        batch.delete(docRef);
      });
      batches.push(
        runInInjectionContext(this.injector, () =>
          from(batch.commit()).pipe(
            catchError(error => {
              console.error(`Error committing batch ${i / batchSize + 1}:`, error);
              return throwError(() => new Error(`Error deleting documents in batch ${i / batchSize + 1}: ${error.message}`));
            })
          )
        )
      );
    }
    return forkJoin(batches).pipe(
      map(() => void 0),
      catchError(error => {
        console.error('Overall bulk delete error:', error);
        return throwError(() => new Error(`Bulk delete failed: ${error.message}`));
      })
    );
  }
}