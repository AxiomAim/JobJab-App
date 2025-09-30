import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserRolesV2ApiService } from "./user-roles-v2-api.service";
import { UserRole } from "./user-roles.model";


export const UserRolesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _usersV2ApiService = inject(UserRolesV2ApiService);
  const allUserRoles = signal<UserRole[] | null>(null);
  const userRoles = signal<UserRole[] | null>(null);
  const userRole = signal<UserRole | null>(null);

  const getAll = async ():Promise<UserRole[]> => {
    const response = await _usersV2ApiService.getAll();
    allUserRoles.set(response);
    userRoles.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<UserRole> => {
    const response = await _usersV2ApiService.getItem(oid);
    userRole.set(response);
    return response;
  };

  const createItem = async (data: UserRole): Promise<UserRole> => {
    const response = await _usersV2ApiService.createItem(data);
    userRole.set(response);
    return response;
  };

  const updateItem = async (data: UserRole): Promise<UserRole> => {
    const response = await _usersV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _usersV2ApiService.deleteItem(oid);
    userRole.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allUserRoles().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
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
  };
});
