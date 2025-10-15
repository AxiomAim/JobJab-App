import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserTimesheetsV2ApiService } from "./user-timesheets-v2-api.service";
import { UserTimesheet } from "./user-timesheets.model";

export const UserTimesheetsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _userTimesheetsV2ApiService = inject(UserTimesheetsV2ApiService);
  const allUserTimesheets = signal<UserTimesheet[] | null>(null);
  const userTimesheets = signal<UserTimesheet[] | null>(null);
  const userTimesheet = signal<UserTimesheet | null>(null);
  const loginUser = signal<UserTimesheet | null>(null);

  const getAll = async ():Promise<UserTimesheet[]> => {
    const response = await _userTimesheetsV2ApiService.getAll();
    allUserTimesheets.set(response);
    userTimesheets.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<UserTimesheet> => {
    const response = await _userTimesheetsV2ApiService.getItem(oid);
    userTimesheet.set(response);
    return response;
  };

  const createItem = async (data: UserTimesheet): Promise<UserTimesheet> => {
    const response = await _userTimesheetsV2ApiService.createItem(data);
    userTimesheet.set(response);
    return response;
  };

  const updateItem = async (data: UserTimesheet): Promise<UserTimesheet> => {
    const response = await _userTimesheetsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _userTimesheetsV2ApiService.deleteItem(oid);
    userTimesheet.set(null);
    return response;
  };

  const setUser = async (thisUser: UserTimesheet): Promise<UserTimesheet> => {
    userTimesheet.set(thisUser);
    return userTimesheet();
  };
  

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allUserTimesheets().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      userTimesheets.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    userTimesheets: computed(() => userTimesheets()),
    allUserTimesheets: computed(() => allUserTimesheets()),
    userTimesheet: computed(() => userTimesheet()),
    loginUser: computed(() => loginUser()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setUser
  };
});
