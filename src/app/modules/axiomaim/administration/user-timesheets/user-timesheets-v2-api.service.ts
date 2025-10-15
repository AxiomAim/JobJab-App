import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserTimesheetsDataService } from "./user-timesheets-data.service";
import { UserTimesheet } from "./user-timesheets.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const UserTimesheetsV2ApiService = createInjectable(() => {
  const _usersDataService = inject(UserTimesheetsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();
  
  const getAll = async ():Promise<UserTimesheet[]> => {
    const response$ = _usersDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<UserTimesheet> => {
    const response$ = _usersDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: UserTimesheet):Promise<UserTimesheet> => {
    data.orgId = loginUser.orgId;
    const response$ = _usersDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: UserTimesheet):Promise<UserTimesheet> => {
    const response$ = _usersDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _usersDataService.deleteItem(id);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };


  return {
    getAll,
    createItem,
    updateItem,
    deleteItem,
    getItem,
  };
});
