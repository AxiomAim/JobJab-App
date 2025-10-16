import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { UsersV2ApiService } from "./users-v2-api.service";
import { User } from "./users.model";
import { UserRole } from "app/core/models/user-roles.model";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom, tap } from "rxjs";
import { PhoneLabel } from "app/core/models/phone-labels.model";

export const UsersV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _usersV2ApiService = inject(UsersV2ApiService);
  const allUsers = signal<User[] | null>(null);
  const users = signal<User[] | null>(null);
  const user = signal<User | null>(null);
  const loginUser = signal<User | null>(null);
  const userRoles = signal<UserRole[] | null>(null);
  const phoneLabels = signal<PhoneLabel[] | null>(null);

  const getAll = async ():Promise<User[]> => {
    const response = await _usersV2ApiService.getAll();
    allUsers.set(response);
    users.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<User> => {
    const response = await _usersV2ApiService.getItem(oid);
    user.set(response);
    return response;
  };

  const createItem = async (data: User): Promise<User> => {
    const response = await _usersV2ApiService.createItem(data);
    user.set(response);
    return response;
  };

  const updateItem = async (data: User): Promise<User> => {
    const response = await _usersV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _usersV2ApiService.deleteItem(oid);
    user.set(null);
    return response;
  };

  const setUser = async (thisUser: User): Promise<User> => {
    user.set(thisUser);
    return user();
  };
  

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allUsers().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      users.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

    /**
     * Get userRoles
     */
    const getUserRoles = async (): Promise<UserRole[]> => {
      const allUserRoles = _httpClient
          .get<UserRole[]>('api/common/user-roles')
          .pipe(
              tap((res: UserRole[]) => {
                const visibleUserRoles = res.filter(role => role.isVisible);
                userRoles.set(visibleUserRoles);
                return visibleUserRoles;
              })
          );
      return await firstValueFrom(allUserRoles)        
    }
  
    /**
     * Get phoneLabels
     */
    const getPhoneLabels = async (): Promise<PhoneLabel[]> => {
      const allPhoneLabels = _httpClient
          .get<PhoneLabel[]>('api/common/phone-labels')
          .pipe(
              tap((phoneLabelsRes: PhoneLabel[]) => {
                return phoneLabelsRes;
              })
          );
      return await firstValueFrom(allPhoneLabels)        
    }

    return {
    users: computed(() => users()),
    allUsers: computed(() => allUsers()),
    user: computed(() => user()),
    loginUser: computed(() => loginUser()),
    userRoles: computed(() => userRoles()),
    phoneLabels: computed(() => phoneLabels()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setUser,
    getUserRoles,
    getPhoneLabels
  };
});
