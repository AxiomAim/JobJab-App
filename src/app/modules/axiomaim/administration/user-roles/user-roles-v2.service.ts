import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserRolesV2ApiService } from "./user-roles-v2-api.service";
import { UserRole } from "./user-roles.model";
import { firstValueFrom, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

export const UserRolesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _userRolesV2ApiService = inject(UserRolesV2ApiService);
  const allUserRoles = signal<UserRole[] | null>(null);
  const userRoles = signal<UserRole[] | null>(null);
  const userRole = signal<UserRole | null>(null);

  
  const getAll = async ():Promise<UserRole[]> => {
    const response = await _userRolesV2ApiService.getAll();
    allUserRoles.set(response);
    userRoles.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<UserRole> => {
    const response = await _userRolesV2ApiService.getItem(oid);
    userRole.set(response);
    return response;
  };

  const createItem = async (data: UserRole): Promise<UserRole> => {
    const response = await _userRolesV2ApiService.createItem(data);
    userRole.set(response);
    return response;
  };

  const updateItem = async (data: UserRole): Promise<UserRole> => {
    const response = await _userRolesV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _userRolesV2ApiService.deleteItem(oid);
    userRole.set(null);
    return response;
  };

  const setContact = async (thisContact: UserRole): Promise<UserRole> => {
    userRole.set(thisContact);
    return userRole();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allUserRoles().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      userRoles.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  
  return {
    userRoles: computed(() => userRoles()),
    allUserRoles: computed(() => allUserRoles()),
    userRole: computed(() => userRole()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
  };
});
