import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { UsersV2ApiService } from "./services-v2-api.service";
import { User } from "./services.model";

const ALL_USERS = "allUsers";
const USERS = "users";
const USER = "user";
const LOGIN_USER = "loginUser";


export const UsersV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _usersV2ApiService = inject(UsersV2ApiService);
  const allUsers = signal<User[] | null>(null);
  const users = signal<User[] | null>(null);
  const user = signal<User | null>(null);
  const loginUser = signal<User | null>(null);

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

  return {
    users: computed(() => users()),
    allUsers: computed(() => allUsers()),
    user: computed(() => user()),
    loginUser: computed(() => loginUser()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
