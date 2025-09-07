import { createInjectable } from "ngxtension/create-injectable";
import { EncryptStorage } from "encrypt-storage";
import { signal, computed, inject } from "@angular/core";
import { map, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { User } from "../users/user.model";
import { Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage'; // Import getDownloadURL
import { UserRolesDataService } from "./user-roles-data.service";
import { UserRole } from "./user-role.model";
import { cloneDeep } from "lodash";

export const encryptStorage = new EncryptStorage("encrypt-davesa", {
  storageType: "sessionStorage",
});


const USER_ROLES = "userRoles";
const USER_ROLE = "userRole";

export const UserRolesV2Service = createInjectable(() => {
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
  const _userRolesDataService = inject(UserRolesDataService);
  const _storage = inject(Storage);

  const userRoles = signal<UserRole[] | null>(null);
  const userRole = signal<UserRole | null>(null);
  const loginUser = signal<User | null>(null);
  const error = signal<string | null>(null);

  const getAll = (): Observable<UserRole[]> => {
  return new Observable<UserRole[]>((observer) => {
    _userRolesDataService.getAll().pipe(tap((res) => {            
        if(res.length > 0) {
            userRoles.set(res);
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


const getAllUserRolePermissions = (): Observable<UserRole[]> => {
  return new Observable<UserRole[]>((observer) => {
    _userRolesDataService.getAll().pipe(tap((res) => {            
        if(res.length > 0) {
            userRoles.set(res);
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


const getById = (id: string): Observable<UserRole> => {
  return new Observable<UserRole>((observer) => {
        // Find the userRole
        const res = userRoles().find((item) => item.id === id) || null;
        if(res) {
          userRole.set(res);
          setToStorage();
          observer.next(userRole());
        } else {
          observer.error('Object not found');
        }
        observer.complete();
  });
};

const search = (query: string): Observable<UserRole[]> => {
  return new Observable<UserRole[]>((observer) => {
    // Clone the contacts
    let resUserRoles = cloneDeep(userRoles());
    // If the query exists...
    if (query) {
      // Filter the contacts
      resUserRoles = resUserRoles.filter(
          (user) =>
              user.name &&
              user.name
                  .toLowerCase()
                  .includes(query.toLowerCase())
      );
    }
    resUserRoles.sort((a, b) => a.name.localeCompare(b.name));
    observer.next(resUserRoles);
    observer.complete();
  });
}

  
const createItem = (item: UserRole): Observable<UserRole> => {
          return _userRolesDataService.createItem(item).pipe(
            map((createdCsvObject) => {
              userRoles.set([...userRoles(), createdCsvObject]);
              userRole.set(createdCsvObject);
              setToStorage();
              return createdCsvObject;
            })
          );
      }

const deleteItem = (id): Observable<UserRole> => {
  return new Observable<UserRole>((observer) => {
    _userRolesDataService.deleteItem(id).pipe(
      map(() => {
        // Find the index of the deleted userRole
        const idx = userRoles().findIndex((item) => item.id === id);

        // Delete the userRole
        const deletedCsvObject = userRoles().splice(idx, 1)[0];

        // Notify the observer
        observer.next(deletedCsvObject);
        observer.complete();
      })
    ).subscribe();
  });
};

const updateItem = (id: string, userRole: UserRole): Observable<UserRole> => {
  return new Observable<UserRole>((observer) => {
    _userRolesDataService.updateItem(userRole).pipe(map(
      (updatedCsvObject) => {
        // Find the index of the updated userRole
        const index = userRoles().findIndex(
          (item) => item.id === id
        );
        // Update the userRole
        userRoles[index] = updatedCsvObject;

        // Update the userRoles
        userRoles.set([...userRoles()]);
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
      const jsonCsvObjects = encryptStorage.getItem(USER_ROLES);
      userRoles.set(jsonCsvObjects);
      const jsonCsvObject = encryptStorage.getItem(USER_ROLE);
      userRole.set(jsonCsvObject);
      setToStorage();
    } catch (err: any) {
      error.set(err);
      console.error("Error loading user from storage:", err);
    }
  };

  const setToStorage = () => {
    error.set(null);
    try {
      encryptStorage.setItem(USER_ROLES, JSON.stringify(userRoles()));
      encryptStorage.setItem(USER_ROLE, JSON.stringify(userRole()));
    } catch (err: any) {
      error.set(err);
      console.error("Error setting user to storage:", err);
    }
  };

  const removeFromStorage = () => {
    error.set(null);
    try {
      encryptStorage.removeItem(USER_ROLES);
      encryptStorage.removeItem(USER_ROLE);
    } catch (err: any) {
      error.set(err);
      console.error("Error removing user from storage:", err);
    }
  };


  return {
    userRoles: computed(() => userRoles()),
    userRole: computed(() => userRole()),
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
    getAllUserRolePermissions
  };
});

