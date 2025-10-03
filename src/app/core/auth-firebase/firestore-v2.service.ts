import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import {
    Firestore,
    collection,
    query,
    where,
    deleteDoc,
    addDoc,
    updateDoc,
    collectionData,
    getDoc,
    doc,
    setDoc,
    WhereFilterOp,
    docData,
    getDocs,
    writeBatch,
} from '@angular/fire/firestore';
import { BaseDatabaseModel } from '../models/base-dto.model';
import { catchError, forkJoin, from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { User } from "app/modules/axiomaim/administration/users/users.model";

export interface FirestoreQuery {
    field: string;
    operation: WhereFilterOp;
    searchKey: any;
}

export const FirestoreV2Service = createInjectable(() => {
    const _router = inject(Router);
    const _firestore = inject(Firestore);
    const loginUser = signal<User | null>(null);

    const getAll = <T extends BaseDatabaseModel>(orgId: string, collectionPath: string): Observable<T[]> => {
        // const colRef = collection(_firestore, collectionPath);
        // return collectionData<any>(colRef, { idField: 'id' }).pipe(
        //     catchError(error => {
        //         console.error(`Error fetching collection ${collectionPath}:`, error);
        //         throw error;
        //     })
        // );
        const colRef = collection(_firestore, collectionPath);
        const q = query(colRef, where('orgId', '==', orgId));
        const converter = {
            toFirestore: (data: T) => data,
            fromFirestore: (snap: any) => ({ id: snap.id, ...snap.data() } as T)
        };
        const qWithConverter = q.withConverter(converter);
        return collectionData<T>(qWithConverter).pipe(
            catchError(error => {
                console.error('Error fetching data:', error);
                return of([]);
            })
        );
    };

    const getItem = <T extends BaseDatabaseModel>(collectionPath: string, id: string): Observable<T> => {
        return docData(doc(_firestore, `${collectionPath}/${id}`), { idField: 'id' }).pipe(
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
        );
    }

    const getQuery = <T extends BaseDatabaseModel>(collectionPath: string, fieldName: string, operator: WhereFilterOp, value: string): Observable<T[]> => {
        const colRef = collection(_firestore, collectionPath);
        const q = query(colRef, where(fieldName, operator, value));
        const converter = {
            toFirestore: (data: T) => data,
            fromFirestore: (snap: any) => ({ id: snap.id, ...snap.data() } as T)
        };
        const qWithConverter = q.withConverter(converter);
        return collectionData<T>(qWithConverter).pipe(
            catchError(error => {
                console.error('Error fetching data:', error);
                return of([]);
            })
        );
    }


    const getQueryWhereclause = <T extends BaseDatabaseModel>(collectionPath: string, queries: FirestoreQuery[]): Observable<T[]> => {
            const colRef = collection(_firestore, collectionPath);
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
            return collectionData<T>(qWithConverter).pipe(
                catchError(error => {
                    console.error('Error fetching data:', error);
                    return of([]);
                })
            );
        }
    
        const getCompoundQuery = <T extends BaseDatabaseModel>(collectionPath: string, queryString: FirestoreQuery[]): Observable<T[]> => {
            const colRef = collection(_firestore, collectionPath);
            let q = query(colRef);
            for (let qItem of queryString) {
                q = query(q, where(qItem.field, qItem.operation, qItem.searchKey));
            }
            const converter = {
                toFirestore: (data: T) => data,
                fromFirestore: (snap: any) => ({ id: snap.id, ...snap.data() } as T)
            };
            const qWithConverter = q.withConverter(converter);
            return collectionData<T>(qWithConverter).pipe(
                catchError(error => {
                    console.error('Error fetching data:', error);
                    return of([]);
                })
            );
        }
        

    const createItem = <T extends BaseDatabaseModel>(collectionPath: string, data: T): Observable<T> => {
        let docRef;
        if (data.id) {
            docRef = doc(_firestore, collectionPath, data.id);
        } else {
            docRef = doc(collection(_firestore, collectionPath));
        }
        return from(setDoc(docRef, data)).pipe(
            map(() => ({ ...data, id: docRef.id } as T))
        );
    }

    const updateItem = <T extends BaseDatabaseModel>(collectionPath: string, id: string, data: Partial<T>): Observable<T> => {
        const docRef = doc(_firestore, collectionPath, id);
        return from(getDoc(docRef)).pipe(
            switchMap(docSnap => {
                if (docSnap.exists()) {
                    const updatedData = { ...docSnap.data(), ...data } as any;
                    return from(updateDoc(docRef, updatedData)).pipe(
                        map(() => updatedData)
                    );
                }
                throw new Error(`Document with ID ${id} not found`);
            })
        );
    }

    const deleteItem = <T extends BaseDatabaseModel>(collectionPath: string, id: string): Observable<T> => {
        const docRef = doc(_firestore, collectionPath, id);
        return from(getDoc(docRef)).pipe(
            switchMap(docSnap => {
                if (docSnap.exists()) {
                    return from(deleteDoc(docRef)).pipe(
                        map(() => ({ id: docSnap.id, ...docSnap.data() } as T))
                    );
                }
                throw new Error(`Document with ID ${id} not found`);
            })
        );
    }



    const bulkCreate = <T extends BaseDatabaseModel>(collectionPath: string, data: T[]): Observable<T[]> => {
        const batchSize = 499;
        const batches: Observable<T[]>[] = [];
        const savedData: T[] = [];
        for (let i = 0; i < data.length; i += batchSize) {
            const batch = writeBatch(_firestore);
            const batchData = data.slice(i, i + batchSize);
            batchData.forEach(item => {
                let docRef;
                if (item.id) {
                    docRef = doc(_firestore, collectionPath, item.id);
                } else {
                    docRef = doc(collection(_firestore, collectionPath));
                }
                batch.set(docRef, item);
                savedData.push({ ...item, id: docRef.id } as T);
            });
            batches.push(
                from(batch.commit()).pipe(
                    map(() => batchData)
                )
            );
        }
        return forkJoin(batches).pipe(
            map(results => results.flat())
        );
    }

    const bulkUpdate = <T extends BaseDatabaseModel>(collectionPath: string, data: T[]): Observable<T[]> => {
        const batchSize = 499;
        const batches: Observable<T[]>[] = [];
        const updatedData: T[] = [];
        for (let i = 0; i < data.length; i += batchSize) {
            const batch = writeBatch(_firestore);
            const batchData = data.slice(i, i + batchSize);
            batchData.forEach(item => {
                if (!item.id) {
                    throw new Error('ID is required for bulkUpdate');
                }
                const docRef = doc(_firestore, collectionPath, item.id);
                batch.update(docRef, { ...item } as any);
                updatedData.push({ ...item } as T);
            });
            batches.push(
                from(batch.commit()).pipe(
                    map(() => batchData)
                )
            );
        }
        return forkJoin(batches).pipe(
            map(results => results.flat())
        );
    }

    const bulkDelete = <T extends BaseDatabaseModel>(collectionPath: string, ids: string[]): Observable<void> => {
        const batchSize = 499;
        const batches: Observable<any>[] = [];
        for (let i = 0; i < ids.length; i += batchSize) {
            const batch = writeBatch(_firestore);
            const batchIds = ids.slice(i, i + batchSize);
            batchIds.forEach(id => {
                const docRef = doc(_firestore, collectionPath, id);
                batch.delete(docRef);
            });
            batches.push(
                from(batch.commit()).pipe(
                    catchError(error => {
                        console.error(`Error committing batch ${i / batchSize + 1}:`, error);
                        return throwError(() => new Error(`Error deleting documents in batch ${i / batchSize + 1}: ${error.message}`));
                    })
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


return {
    loginUser: computed(() => loginUser()),
    getAll,
    getItem,
    getQueryWhereclause,
    getCompoundQuery,
    createItem,
    updateItem,
    deleteItem,
    bulkCreate,
    bulkUpdate,
    getQuery,
    bulkDelete
  };
});
