import { createInjectable } from "ngxtension/create-injectable";
import { EncryptStorage } from "encrypt-storage";
import { signal, computed, inject } from "@angular/core";
import { map, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { FirestoreQuery } from "app/core/auth-firebase/firestore.service";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { UsersDataService } from "./users-data.service";
import { Country, User, UserModel } from "./user.model";
import { Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage'; // Import getDownloadURL
import { Tag } from "app/core/models/tag.model";
import { cloneDeep } from "lodash";
import { Organization } from "../organizations/organizations.model";
import { UsersBackupDataService } from "./users-backup-data.service";
import { UsersRestoreDataService } from "./users-restore-data.service";
import { UserRolesV2Service } from "../user-roles/userRolesV2.service";
import { UserRoles } from "app/core/enum/user-role.enum";
import { UserRole } from "../user-roles/user-role.model";

export const encryptStorage = new EncryptStorage("encrypt-davesa", {
  storageType: "sessionStorage",
});


const USERS = "users";
const USER = "user";
const LOGIN_USER = "loginUser";

export const UsersV2Service = createInjectable(() => {
  const allCountries = [
    {
      id: 'f9033267-9df0-46e4-9f79-c8b022e5c835',
      iso: 'us',
      name: 'United States',
      code: '+1',
      flagImagePos: '-1px -69px',
    },
  ]

  const _router = inject(Router);
  const _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
  const _usersDataService = inject(UsersDataService);
  const _userRolesV2Service = inject(UserRolesV2Service);

  
  const _usersBackupDataService = inject(UsersBackupDataService);
  const _usersRestoreDataService = inject(UsersRestoreDataService);
  const _storage = inject(Storage);

  const users = signal<User[] | null>(null);
  const user = signal<User | null>(null);
  const userRoles = signal<UserRole[] | null>(null);
  const countries = signal<Country[] | null>(allCountries);

  const loginUser = signal<User | null>(null);
  const organization = signal<Organization | null>(null);
  const objectId = signal<string | null>(null);
  // loginUser.set(_firebaseAuthV2Service.loginUser());
  const error = signal<string | null>(null);

  const initialize = (): Observable<any> => {
    return new Observable<any>((observer) => {
      loginUser.set(_firebaseAuthV2Service.loginUser());
      organization.set(_firebaseAuthV2Service.organization());
      const response = {
        loginUser: loginUser(),
        organization: organization(),
      }
      if(response) {
          observer.next(response);
        } else {
          observer.error('Object not found');
        }
        observer.complete();
    });
  }
  

  const getAll = (orgId?: string): Observable<User[]> => {
    if(!orgId) {
      orgId = organization().id;    
    }
    const whereclause: FirestoreQuery[] = [];
    const clause1: FirestoreQuery = { field: 'orgId', operation: '==', searchKey: orgId
     };
    whereclause.push(clause1);
    return _usersDataService.getQueryWhereclause(whereclause).pipe(tap((res) => {            
      console.log('users', res)
      if(res.length > 0) {
            users.set(res);
            return users();
        }
        }));
    }
  
    const getUserRoles = (orgId?: string): Observable<UserRole[]> => {
      return _userRolesV2Service.getAll().pipe(tap((res) => {            
          userRoles.set(res);
              return userRoles();
          }
          ));
      }

      // return new Observable<User[]>((observer) => {
  //   _usersDataService.getAll().pipe(tap((res) => {            
  //       if(res.length > 0) {
  //           users.set(res);
  //           setToStorage();
  //           observer.next(res);
  //         } else {
  //           observer.next([]);
  //           observer.error('Object not found');
  //         }
  //         observer.complete();
  //       })).subscribe();
  //   })
// };

const getloginUser = (): Observable<User> => {
  return new Observable<User>((observer) => {

    loginUser.set(_firebaseAuthV2Service.loginUser());
    if(loginUser()) {
        setToStorage();
        observer.next(loginUser());
      } else {
        observer.error('Object not found');
      }
      observer.complete();
  });
}

const getAllObjects = (objId: string): Observable<User[]> => {
    return new Observable<User[]>((observer) => {
    error.set(null);
    const whereclause: FirestoreQuery[] = [];
    const clause1: FirestoreQuery = { field: 'object', operation: '==', searchKey: objId
     };
    whereclause.push(clause1);
     objectId.set(objId);
    return _usersDataService.getQueryWhereclause(whereclause).pipe(tap((res) => {            
        if(res.length > 0) {
            users.set(res);
            setToStorage();
            observer.next(res);
          } else {
            observer.error('Object not found');
          }
          observer.complete();
            return users();
        })).subscribe();
    })
};

const getAllByOrgId = (orgId: string): Observable<User[]> => {
  return new Observable<User[]>((observer) => {
  error.set(null);
  const whereclause: FirestoreQuery[] = [];
  const clause1: FirestoreQuery = { field: 'orgId', operation: '==', searchKey: orgId
   };
  whereclause.push(clause1);
   objectId.set(orgId);
  return _usersDataService.getQueryWhereclause(whereclause).pipe(tap((res) => {            
      if(res.length > 0) {
          users.set(res);
          setToStorage();
          observer.next(res);
        } else {
          observer.error('Object not found');
        }
        observer.complete();
          return users();
      })).subscribe();
  })
};

const getById = (id: string): Observable<User> => {
    return _usersDataService.getItem(id).pipe(tap((res) => {
      user.set(res);
      return res;
    }));
};

const search = (query: string): Observable<User[]> => {
  return new Observable<User[]>((observer) => {
    // Clone the contacts
    let resUsers = cloneDeep(users());
    // If the query exists...
    if (query) {
      // Filter the contacts
      resUsers = resUsers.filter(
          (user) =>
              user.displayName &&
              user.displayName
                  .toLowerCase()
                  .includes(query.toLowerCase())
      );
      resUsers.sort((a, b) => a.displayName.localeCompare(b.displayName));
    }
    observer.next(resUsers);
    observer.complete();
  });
}

const createItem = (item: User): Observable<User> => {
          return _usersDataService.createItem(item).pipe(
            map((createdCsvObject) => {
              users.set([...users(), createdCsvObject]);
              user.set(createdCsvObject);
              setToStorage();
              return createdCsvObject;
            })
          );
      }

const deleteItem = (id): Observable<User> => {
  return new Observable<User>((observer) => {
    _usersDataService.deleteItem(id).pipe(
      map(() => {
        // Find the index of the deleted user
        const idx = users().findIndex((item) => item.id === id);

        // Delete the user
        const deletedCsvObject = users().splice(idx, 1)[0];

        // Notify the observer
        observer.next(deletedCsvObject);
        observer.complete();
      })
    ).subscribe();
  });
};

const updateItem = (id: string, user: User): Observable<User> => {
  return new Observable<User>((observer) => {
    _usersDataService.updateItem(user).pipe(map(
      (updatedCsvObject) => {
        // Find the index of the updated user
        const index = users().findIndex(
          (item) => item.id === id
        );
        // Update the user
        users[index] = updatedCsvObject;

        // Update the users
        users.set([...users()]);
        setToStorage();
        // Notify the observer
        observer.next(updatedCsvObject);
        observer.complete();
      })).subscribe();
  });
}

const loadFromStorage = () => {
    error.set(null);
    try {
      const jsonCsvObjects = encryptStorage.getItem(USERS);
      users.set(jsonCsvObjects);
      const jsonCsvObject = encryptStorage.getItem(USER);
      user.set(jsonCsvObject);
      const jsonloginUser = encryptStorage.getItem(LOGIN_USER);
      loginUser.set(jsonloginUser);
      setToStorage();
    } catch (err: any) {
      error.set(err);
      console.error("Error loading user from storage:", err);
    }
  };

  const setToStorage = () => {
    error.set(null);
    try {
      encryptStorage.setItem(USERS, JSON.stringify(users()));
      encryptStorage.setItem(USER, JSON.stringify(user()));
      encryptStorage.setItem(LOGIN_USER, JSON.stringify(loginUser()));
    } catch (err: any) {
      error.set(err);
      console.error("Error setting user to storage:", err);
    }
  };

  const removeFromStorage = () => {
    error.set(null);
    try {
      encryptStorage.removeItem(USERS);
      encryptStorage.removeItem(USER);
      encryptStorage.removeItem(LOGIN_USER);
    } catch (err: any) {
      error.set(err);
      console.error("Error removing user from storage:", err);
    }
  };

  const uploadAvatar = (file: File, bucket: string): Observable<any> => {
    let date: any = new Date().toISOString();

    return new Observable<any>((observer) => {
      const storageRef = ref(_storage, `${bucket}/${date}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log("_storage", storageRef);

      uploadTask.then((snapshot) => { // Use then() for completion
        getDownloadURL(snapshot.ref).then((downloadURL) => {

          console.log("downloadURL", downloadURL);
          const asset = {
            fileName: file.name,
            fileType: file.type,
            filePath: storageRef.fullPath,
            fileUrl: downloadURL,
          };
          observer.next(asset);
          observer.complete();
        }).catch((error) => {
          console.error("Error getting download URL:", error);
          observer.error(error);
          observer.complete();
        });
      }).catch((error) => {
        console.error("Upload error:", error);
        observer.error(error);
        observer.complete();
      });
    });
  }

  const removeAvatar = (user: User, url: string): Observable<User> => {
    return new Observable<User>((observer) => {
    const storageRef = ref(_storage, url);
    const uploadTask = deleteObject(storageRef).then(() => {
        user.avatar = null;
        updateItem(user.id, user.avatar = null);
        console.log('File deleted successfully');
        return of(true);
    }).catch((error) => {
        console.error("Upload error:", error);
        return of(error);
      });
    });

  }


  const isValidType = (file: File, type: string): boolean => {
    console.log('file', file)
    // For more accurate validation, use:
    // return file.type.startsWith('image/'); 
    return file.type === type; 
}

const refactorModel = (): Observable<User[]> => {
  var updateUsers: User[] = [];

  const usersBackup = users();

  console.log('updateUsers', updateUsers)
    return _usersDataService.getAll().pipe(switchMap((allUsers) => {
      allUsers.forEach((thisUser) => {    
        const refUser: User = UserModel.emptyDto();   
        refUser.id = thisUser.id;
        refUser.orgId = thisUser.orgId;
        // refUser.domain = thisUser.domain;
        // refUser.firstTime = thisUser.firstTime;
        // refUser.staffId = thisUser.staffId;
        // refUser.staff = thisUser.staff;
        refUser.projectId = thisUser.projectId;
        refUser.activeUser = true;
        refUser.userName = thisUser.userName;
        refUser.displayName = thisUser.userName;
        refUser.userRoles = thisUser.userRoles;
        refUser.title = thisUser.title;
        // refUser.signatureName = '';
        // refUser.signatureRole = '';
        // refUser.signaturePassword = '';
        // refUser.signatureUrl = '';
        // refUser.signaturePath = '';
        // refUser.signatureFile = '';
        // refUser.signatureType = '';
        refUser.firstName = thisUser.firstName;
        refUser.lastName = thisUser.lastName;
        // refUser.address = thisUser.address;
        refUser.emailSignature = thisUser.userName + ' ' + thisUser.email;  
        refUser.email = thisUser.email;
        // refUser.emailKey = '';
        // refUser.personalEmail = '';
        // refUser.avatar = '';
        // refUser.avatarUrl = '';
        // refUser.avatarPath = '';
        // refUser.avatarFile = '';
        // refUser.avatarType = '';
        refUser.background = 'images/cards/davesa-card.jpg';
        // refUser.linkedIn = '';
        // refUser.phoneNumbers = [];
        refUser.mobileCountry = thisUser.mobileCountry ? thisUser.mobileCountry : '';
        refUser.mobileNo = thisUser.mobileNo ? thisUser.mobileNo : '';
        refUser.officeNo = thisUser.officeNo ? thisUser.officeNo : '';
        // refUser.token = '';
        // refUser.web_token = '';
        // refUser.tokenDate = '';
        // refUser.status = '';
        refUser.theme = 'theme-default';
        refUser.scheme = 'light';
        // refUser.theme = null;
        // refUser.scheme = null;
        // refUser.platform = '';
        // refUser.selected = false;
        // refUser.login_at = [];
        // refUser.login_info = [];
        refUser.created_at = thisUser.created_at;
        refUser.updated_at = thisUser.updated_at;
        // refUser.deleted_at = '';
        
        // const finalUser: User = { ...refUser, ...thisUser }; 
        // thisUser.background = 'images/cards/davesa-card.jpg';
        // thisUser.displayName = thisUser.firstName + ' ' + thisUser.lastName;
        // thisUser.emailSignature = thisUser.displayName + ' ' + thisUser.email;
        // const domain = getEmailDomain(thisUser.email);
        // thisUser.orgId = domain;
        // thisUser.domain = domain;
        // thisUser.userRoles = [];
        // thisUser.activeUser = true;
        updateUsers.push(refUser);
      });
    
      // return _usersBackupDataService.bulkDeleteAll().pipe(switchMap(() => {
        // return _usersDataService.bulkDeleteAll().pipe(switchMap(() => {
          // return _usersBackupDataService.bulkCreate(allUsers).pipe(switchMap((backupUsers) => {
            return _usersDataService.bulkUpdate(updateUsers).pipe(map((resUsers) => {
              console.log('bulkUpdate', updateUsers)
              return resUsers;
            }));    
        // }));
      // }));
    // }));
  }));

};

const getEmailDomain = (email: string): string | null => {
  const match = email.match(/@([^@]+)$/); 
  return match ? match[1] : null; 

};


const getCountries = (): Observable<User> => {
  return new Observable<User>((observer) => {
  });
};

const getTags = (): Observable<Tag[]> => {
  return new Observable<Tag[]>((observer) => {

  });
};

const createTag = (teg: Tag): Observable<Tag> => {
  return new Observable<Tag>((observer) => {

  });
};

const updateTag = (teg: Tag): Observable<Tag> => {
  return new Observable<Tag>((observer) => {

  });
};

const deleteTag = (id: string): Observable<Tag> => {
  return new Observable<Tag>((observer) => {

  });
};


// /**
    //  * Get countries
    //  */
    // getCountries(): Observable<Country[]> {
    //     return this._httpClient
    //         .get<Country[]>('api/apps/contacts/countries')
    //         .pipe(
    //             tap((countries) => {
    //                 this._countries.next(countries);
    //             })
    //         );
    // }

    /**
     * Get tags
     */
    // getTags(): Observable<Tag[]> {
    //     return this._httpClient.get<Tag[]>('api/apps/contacts/tags').pipe(
    //         tap((tags) => {
    //             this._tags.next(tags);
    //         })
    //     );
    // }

    // createTag(tag: Tag): Observable<Tag> {
    //     return this.tags$.pipe(
    //         take(1),
    //         switchMap((tags) =>
    //             this._httpClient
    //                 .post<Tag>('api/apps/contacts/tag', { tag })
    //                 .pipe(
    //                     map((newTag) => {
    //                         // Update the tags with the new tag
    //                         this._tags.next([...tags, newTag]);

    //                         // Return new tag from observable
    //                         return newTag;
    //                     })
    //                 )
    //         )
    //     );
    // }

    // updateTag(id: string, tag: Tag): Observable<Tag> {
    //     return this.tags$.pipe(
    //         take(1),
    //         switchMap((tags) =>
    //             this._httpClient
    //                 .patch<Tag>('api/apps/contacts/tag', {
    //                     id,
    //                     tag,
    //                 })
    //                 .pipe(
    //                     map((updatedTag) => {
    //                         // Find the index of the updated tag
    //                         const index = tags.findIndex(
    //                             (item) => item.id === id
    //                         );

    //                         // Update the tag
    //                         tags[index] = updatedTag;

    //                         // Update the tags
    //                         this._tags.next(tags);

    //                         // Return the updated tag
    //                         return updatedTag;
    //                     })
    //                 )
    //         )
    //     );
    // }

    /**
     * Delete the tag
     *
     * @param id
     */
    // deleteTag(id: string): Observable<boolean> {
    //     return this.tags$.pipe(
    //         take(1),
    //         switchMap((tags) =>
    //             this._httpClient
    //                 .delete('api/apps/contacts/tag', { params: { id } })
    //                 .pipe(
    //                     map((isDeleted: boolean) => {
    //                         // Find the index of the deleted tag
    //                         const index = tags.findIndex(
    //                             (item) => item.id === id
    //                         );

    //                         // Delete the tag
    //                         tags.splice(index, 1);

    //                         // Update the tags
    //                         this._tags.next(tags);

    //                         // Return the deleted status
    //                         return isDeleted;
    //                     }),
    //                     filter((isDeleted) => isDeleted),
    //                     switchMap((isDeleted) =>
    //                         this.contacts$.pipe(
    //                             take(1),
    //                             map((contacts) => {
    //                                 // Iterate through the contacts
    //                                 contacts.forEach((contact) => {
    //                                     const tagIndex = contact.tags.findIndex(
    //                                         (tag) => tag === id
    //                                     );

    //                                     // If the contact has the tag, remove it
    //                                     if (tagIndex > -1) {
    //                                         contact.tags.splice(tagIndex, 1);
    //                                     }
    //                                 });

    //                                 // Return the deleted status
    //                                 return isDeleted;
    //                             })
    //                         )
    //                     )
    //                 )
    //         )
    //     );
    // }


  return {
    users: computed(() => users()),
    user: computed(() => user()),
    userRoles: computed(() => userRoles()),
    countries: computed(() => countries()),
    loginUser: computed(() => loginUser()),
    organization: computed(() => organization()),
    objectId: computed(() => objectId()),
    getAllObjects,
    getById: getById,
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    search,
    createItem,
    deleteItem,
    updateItem,
    getAll,
    getloginUser,
    uploadAvatar,
    removeAvatar,
    getCountries,
    getTags,
    createTag,
    updateTag,
    deleteTag,
    refactorModel,
    getEmailDomain,
    getAllByOrgId,
    initialize,
    getUserRoles
  };
});

