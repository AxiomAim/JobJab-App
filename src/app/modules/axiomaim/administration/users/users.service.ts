// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { Category } from 'app/core/models/category.model';
// import { Tag } from 'app/core/models/tag.model';
// import { CategoriesDataService } from 'app/core/services/data-services/categories-data.service';
// import { TagsDataService } from 'app/core/services/data-services/tags-data.service';
// import { cloneDeep } from 'lodash';
// import {
//     BehaviorSubject,
//     Observable,
//     catchError,
//     filter,
//     forkJoin,
//     from,
//     map,
//     of,
//     switchMap,
//     take,
//     tap,
//     throwError,
// } from 'rxjs';

// import { 
//     Firestore, 
//     collection, 
//     query, 
//     where, 
//     deleteDoc, 
//     addDoc,
//     updateDoc,
//     collectionData,
//     getDoc,
//     doc,
//     setDoc,
//     WhereFilterOp,
//     getDocs,
//     writeBatch
//  } from '@angular/fire/firestore';
// // import { FirebaseAuthService } from 'app/core/auth-firebase/firebase-auth.service';
// import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
// import { User, UserModel } from './user.model';
// import { UsersDataService } from './users-data.service';


// @Injectable({ providedIn: 'root' })
// export class UsersService {
//     private _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
//     // Private
//     private _currentUser: BehaviorSubject<User | null> = new BehaviorSubject(
//         null
//     );

//     private _user: BehaviorSubject<User | null> = new BehaviorSubject(
//         null
//     );
//     private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(
//         null
//     );
//     private _categories: BehaviorSubject<Category[] | null> = new BehaviorSubject(
//         null
//     );
//     private _tags: BehaviorSubject<Tag[] | null> = new BehaviorSubject(null);

//     public loginUser: User

//     /**
//      * Constructor
//      */
//     constructor(
//         private _httpClient: HttpClient,
//         private _usersDataService: UsersDataService,
//         private _categoriesDataService: CategoriesDataService,
//         private _tagsDataService: TagsDataService,
//         public firestore: Firestore


//     ) {
//         this._firebaseAuthV2Service.loadFromStorage();
//         this.loginUser = this._firebaseAuthV2Service.loginUser();
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Accessors
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Getter for user
//      */
//     get currentUser$(): Observable<User> {
//         return this._currentUser.asObservable();
//     }

//     get user$(): Observable<User> {
//         return this._user.asObservable();
//     }

//     /**
//      * Getter for users
//      */
//     get users$(): Observable<User[]> {
//         return this._users.asObservable();
//     }

//     /**
//      * Getter for category
//      */
//     get categories$(): Observable<Category[]> {
//         return this._categories.asObservable();
//     }

//     /**
//      * Getter for tags
//      */
//     get tags$(): Observable<Tag[]> {
//         return this._tags.asObservable();
//     }


//     filteredUsers: any[];

//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Get users
//      */
//     getAll(): Observable<User[]> {
//         return this._usersDataService.getAll().pipe(tap((users) => {
//             this._users.next(users);
//         }))
//     }

//     getQuery(): Observable<User[]> {
//         return this._usersDataService.getQuery('email', '!=', '').pipe(tap((users) => {
//             this._users.next(users);
//         }))
//     }

//     // deleteDuplicates(): Observable<void> {
//     //     return this._usersDataService.deleteDuplicates().pipe(map(() => {
//     //         return null
//     //     }))
//     // }

//     public deleteDuplicates(): Observable<any> {
//         const q = query(
//           collection(this.firestore, 'users'),
//           where('activeUser', '==', false) 
//         );
//         return from(getDocs(q)).pipe(
//           switchMap((querySnapshot) => {
//             console.log('querySnapshot', querySnapshot.size)
//             if (querySnapshot.size === 0) {
//                 console.log('querySnapshot: empty', querySnapshot)
//                 return of(undefined); // No matching documents
//             }
      
//             const batchSize = 250; // Set your desired batch size
//             const batches: Observable<void>[] = []; 
      
//             // Create batches of 250 delete operations
//             for (let i = 0; i < querySnapshot.docs.length; i += batchSize) {
//                 console.log('item', i)

//               const batch = writeBatch(this.firestore);
//               const batchDocs = querySnapshot.docs.slice(i, i + batchSize);
//               batchDocs.forEach((doc) => 
//                 {batch.delete(doc.ref)
            
//                 }
//                 );
//               batches.push(from(batch.commit()));
//             }
      
//             // Execute all batches in parallel (optional)
//             return forkJoin(batches); 
//           })
//         );
//       }
  





//       /**
//      * Search studies with given query
//      *
//      * @param query
//      */
//     searchUsers(query: string): Observable<User[]> {
//         let users = cloneDeep(this._users);
//         users.pipe(
//             take(1),
//             map((users) => {
//                 const searchResults = users.filter(
//                     (results) =>
//                     results.name.toLowerCase().includes(query.toLowerCase())
//                 );
//                 this._users.next(searchResults);
//             }),
//             switchMap((users) => {
//                 if (!this.filteredUsers) {
//                     return throwError(
//                         'Could not found document with name of ' + query + '!'
//                     );
//                 }
//             })
//         );
        
//         return this._users.pipe(
//             take(1),
//             map((studies) => {
//                 const searchResults = studies.filter((results) =>
//                     results.name.toLowerCase().includes(query.toLowerCase())
//                 );
//                 this._users.next(searchResults);
//             }),
//             switchMap((studies) => {
//                 if (!this.filteredUsers) {
//                     return throwError(
//                         'Could not found document with name of ' + query + '!'
//                     );
//                 }
//             })
//         );
//     }
    
//     /**
//      * Get user by id
//      */
//     getUserById(id: string): Observable<User> {
//         return this._users.pipe(
//             take(1),
//             map((users) => {
//                 // Find the user
//                 const user = users.find((item) => item.id === id) || null;

//                 // Update the user
//                 this._user.next(user);

//                 // Return the user
//                 return user;
//             }),
//             switchMap((user) => {
//                 if (!user) {
//                     return throwError(
//                         'Could not found user with id of ' + id + '!'
//                     );
//                 }

//                 return of(user);
//             })
//         );
//     }

//     /**
//      * Create user
//      */

    
//     createItem(): Observable<User> {
//         return this.users$.pipe(
//           take(1),
//           switchMap((users) => {
//             const newUser: User = UserModel.emptyDto();
      
//             return this._usersDataService.createItem(newUser).pipe(
//               tap((createdDocument) => {
//                 console.log('User created successfully:', createdDocument);
//                 this._users.next([createdDocument, ...users]); 
//               }),
//               catchError((error) => {
//                 console.error('Error creating User:', error);
//                 // Optional: Return an Observable with an error value, or re-throw
//                 return of(null); // Or: throw error; 
//               })
//             );
//           })
//         );
//       }

//     /**
//      * Update user
//      *
//      * @param id
//      * @param user
//      */
//     updateItem(id: string, user: User): Observable<User> {
//         return this.users$.pipe(
//             take(1),
//             switchMap((users) => 
//                 {
//                 return this._usersDataService.updateItem(user).pipe(tap(
//                         (updatedUser) => {
//                             console.log('updatedUser', updatedUser)
//                             // Find the index of the updated user
//                             const index = users.findIndex(
//                                 (item) => item.id === id
//                             );
//                             console.log('index', index)

//                             // Update the user
//                             users[index] = updatedUser;

//                             // Update the users
//                             this._users.next(users);

//                             // Return the updated user
//                             return updatedUser;
//                         }))
//             }))
//             //     .pipe(tap((updatedUser) => {
//             //                 // Find the index of the updated user
//             //                 const index = users.findIndex(
//             //                     (item) => item.id === id
//             //                 );

//             //                 // Update the user
//             //                 users[index] = updatedUser;

//             //                 // Update the users
//             //                 this._users.next(users);

//             //                 // Return the updated user
//             //                 return updatedUser;
//             //             }),
//             //             switchMap((updatedUser) =>
                            
//             //                 this.user$.pipe(
//             //                     take(1),
//             //                     filter((item) => item && item.id === id),
//             //                     tap(() => {
//             //                         // Update the user if it's selected
//             //                         this._user.next(updatedUser);

//             //                         // Return the updated user
//             //                         return updatedUser;
//             //                     })
//             //                 )
//             //             )
//             //         )
//             // )
//         // );
//     }

//     /**
//      * Delete the user
//      *
//      * @param id
//      */
//     deleteItem(id: string): Observable<boolean> {
//         return this.users$.pipe(
//             take(1),
//             switchMap((users) => {
//                 return this._usersDataService
//                     .deleteItem(id)
//                     .pipe(map(() => {
//                             // Find the index of the deleted user
//                             const index = users.findIndex(
//                                 (item) => item.id === id
//                             );

//                             // Delete the user
//                             users.splice(index, 1);

//                             // Update the users
//                             this._users.next(users);

//                             // Return the deleted status
//                             return true;
//                         })
//                     )
//                 }
//             )
//         );
//     }

//     /**
//      * Get category
//      */
//     getCategories(): Observable<Category[]> {
//         return this._categoriesDataService
//             .getAll()
//             .pipe(
//                 tap((categories) => {
//                     this._categories.next(categories);
//                 })
//             );
//     }

//     /**
//      * Get tags
//      */
//     getTags(): Observable<Tag[]> {
//         return this._tagsDataService.getAll().pipe(
//             tap((tags) => {
//                 this._tags.next(tags);
//             })
//         );
//     }

//     /**
//      * Create tag
//      *
//      * @param tag
//      */
//     createTag(tag: Tag): Observable<Tag> {
//         return this.tags$.pipe(
//             take(1),
//             switchMap((tags) => {
//                 return this._tagsDataService.createItem(tag)
//                     .pipe(
//                         map((newTag) => {
//                             // Update the tags with the new tag
//                             this._tags.next([...tags, newTag]);

//                             // Return new tag from observable
//                             return newTag;
//                         })
//                     )
//                 }
//             )
//         );
//     }

//     /**
//      * Update the tag
//      *
//      * @param id
//      * @param tag
//      */
//     updateTag(id: string, tag: Tag): Observable<Tag> {
//         return this.tags$.pipe(
//             take(1),
//             switchMap((tags) =>
//                 this._tagsDataService
//                     .updateItem(tag)
//                     .pipe(
//                         map((updatedTag) => {
//                             // Find the index of the updated tag
//                             const index = tags.findIndex(
//                                 (item) => item.id === id
//                             );

//                             // Update the tag
//                             tags[index] = updatedTag;

//                             // Update the tags
//                             this._tags.next(tags);

//                             // Return the updated tag
//                             return updatedTag;
//                         })
//                     )
//             )
//         );
//     }

//     /**
//      * Update the avatar of the given user
//      *
//      * @param id
//      * @param avatar
//      */
//     uploadAvatar(id: string, avatar: File): Observable<User> {
//         return this.users$.pipe(
//             take(1),
//             switchMap((users) =>
//                 this._httpClient
//                     .post<User>(
//                         'api/apps/users/avatar',
//                         {
//                             id,
//                             avatar,
//                         },
//                         {
//                             headers: {
//                                 // eslint-disable-next-line @categoryscript-eslint/naming-convention
//                                 'Content-Category': avatar.type,
//                             },
//                         }
//                     )
//                     .pipe(
//                         map((updatedUser) => {
//                             // Find the index of the updated user
//                             const index = users.findIndex(
//                                 (item) => item.id === id
//                             );

//                             // Update the user
//                             users[index] = updatedUser;

//                             // Update the users
//                             this._users.next(users);

//                             // Return the updated user
//                             return updatedUser;
//                         }),
//                         switchMap((updatedUser) =>
//                             this.user$.pipe(
//                                 take(1),
//                                 filter((item) => item && item.id === id),
//                                 tap(() => {
//                                     // Update the user if it's selected
//                                     this._user.next(updatedUser);

//                                     // Return the updated user
//                                     return updatedUser;
//                                 })
//                             )
//                         )
//                     )
//             )
//         );
//     }

//     setupUser() {
//         this._usersDataService.getItem('rXxG6QACwdf5TXxGiBcWS0okr4i1').subscribe(user => {
//                 console.log('user', user)
//         })
//         // const thisUser = UserModel.emptyDto()
//         // thisUser.id = 'rXxG6QACwdf5TXxGiBcWS0okr4i1'
//         // thisUser.firstName = 'Aileen'
//         // thisUser.lastName = 'Aileen'
//     }
// }
