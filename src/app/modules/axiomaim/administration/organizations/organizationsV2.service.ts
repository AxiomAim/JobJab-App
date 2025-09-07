import { createInjectable } from "ngxtension/create-injectable";
import { EncryptStorage } from "encrypt-storage";
import { signal, computed, inject } from "@angular/core";
import { map, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { FirestoreQuery } from "app/core/auth-firebase/firestore.service";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { User } from "../users/user.model";
import { OrganizationsDataService } from "./organizations-data.service";
import { Country, Organization, OrganizationModel } from "./organizations.model";
import { Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage'; // Import getDownloadURL
import { Tag } from "app/core/models/tag.model";

export const encryptStorage = new EncryptStorage("encrypt-davesa", {
  storageType: "sessionStorage",
});


const ORGANIZATIONS = "organizations";
const ORGANIZATION = "organization";
const LOGIN_USER = "loginUser";

export const OrganizationsV2Service = createInjectable(() => {
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
  const _organizationsDataService = inject(OrganizationsDataService);
  const _storage = inject(Storage);

  const organizations = signal<Organization[] | null>(null);
  const organization = signal<Organization | null>(null);
  const countries = signal<Country[] | null>(allCountries);
  const loginUser = signal<User | null>(null);
  const objectId = signal<string | null>(null);
  // loginUser.set(_firebaseAuthV2Service.loginUser());
  const error = signal<string | null>(null);

  const getAll = (): Observable<Organization[]> => {
  return new Observable<Organization[]>((observer) => {
    _organizationsDataService.getAll().pipe(tap((res) => {            
        if(res.length > 0) {
          console.log('res', res)
            organizations.set(res);
            setToStorage();
            observer.next(res);
          } else {
            observer.next([]);
            observer.error('Object not found');
          }
          observer.complete();
        })).subscribe();
    })
};


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

  const getAllObjects = (objId: string): Observable<Organization[]> => {
    return new Observable<Organization[]>((observer) => {
    error.set(null);
    const whereclause: FirestoreQuery[] = [];
    const clause1: FirestoreQuery = { field: 'object', operation: '==', searchKey: objId
     };
    whereclause.push(clause1);
     objectId.set(objId);
    return _organizationsDataService.getQueryWhereclause(whereclause).pipe(tap((res) => {            
        if(res.length > 0) {
          console.log('res', res)
            organizations.set(res);
            setToStorage();
            observer.next(res);
          } else {
            observer.error('Object not found');
          }
          observer.complete();
            return organizations();
        })).subscribe();
    })
};

const getById = (id: string): Observable<Organization> => {
  return new Observable<Organization>((observer) => {
        // Find the organization
        const res = organizations().find((item) => item.id === id) || null;
        if(res) {
          organization.set(res);
          setToStorage();
          observer.next(organization());
        } else {
          observer.error('Object not found');
        }
        observer.complete();
  });
};

const searchCsvObjects = (query: string): Observable<Organization[]> => {
  return new Observable<Organization[]>((observer) => {
          const searchResults = organizations().filter(
              (results) =>
              results.name.toLowerCase().includes(query.toLowerCase())
          );
          observer.next(searchResults);
          observer.complete();
  });
}
  
const createItem = (item: Organization): Observable<Organization> => {
          return _organizationsDataService.createItem(item).pipe(
            map((createdCsvObject) => {
              organizations.set([...organizations(), createdCsvObject]);
              organization.set(createdCsvObject);
              setToStorage();
              return createdCsvObject;
            })
          );
      }

const deleteItem = (id): Observable<Organization> => {
  return new Observable<Organization>((observer) => {
    _organizationsDataService.deleteItem(id).pipe(
      map(() => {
        // Find the index of the deleted organization
        const idx = organizations().findIndex((item) => item.id === id);

        // Delete the organization
        const deletedCsvObject = organizations().splice(idx, 1)[0];

        // Notify the observer
        observer.next(deletedCsvObject);
        observer.complete();
      })
    ).subscribe();
  });
};

const updateItem = (id: string, organization: Organization): Observable<Organization> => {
  return new Observable<Organization>((observer) => {
    _organizationsDataService.updateItem(organization).pipe(map(
      (updatedCsvObject) => {
        console.log('updatedCsvObject', updatedCsvObject)
        // Find the index of the updated organization
        const index = organizations().findIndex(
          (item) => item.id === id
        );
        // Update the organization
        organizations[index] = updatedCsvObject;

        // Update the organizations
        organizations.set([...organizations()]);
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
      const jsonCsvObjects = encryptStorage.getItem(ORGANIZATIONS);
      organizations.set(jsonCsvObjects);
      const jsonCsvObject = encryptStorage.getItem(ORGANIZATION);
      organization.set(jsonCsvObject);
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
      encryptStorage.setItem(ORGANIZATIONS, JSON.stringify(organizations()));
      encryptStorage.setItem(ORGANIZATION, JSON.stringify(organization()));
      encryptStorage.setItem(LOGIN_USER, JSON.stringify(loginUser()));
    } catch (err: any) {
      error.set(err);
      console.error("Error setting user to storage:", err);
    }
  };

  const removeFromStorage = () => {
    error.set(null);
    try {
      encryptStorage.removeItem(ORGANIZATIONS);
      encryptStorage.removeItem(ORGANIZATION);
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

  const removeAvatar = (organization: Organization, url: string): Observable<Organization> => {
    return new Observable<Organization>((observer) => {
    const storageRef = ref(_storage, url);
    const uploadTask = deleteObject(storageRef).then(() => {
        organization.avatar = null;
        updateItem(organization.id, organization.avatar = null);
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


const getCountries = (): Observable<Organization> => {
  return new Observable<Organization>((observer) => {
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
    organizations: computed(() => organizations()),
    organization: computed(() => organization()),
    countries: computed(() => countries()),
    loginUser: computed(() => loginUser()),
    objectId: computed(() => objectId()),
    getAllObjects,
    getById: getById,
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    searchCsvObjects,
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
    deleteTag
  };
});

