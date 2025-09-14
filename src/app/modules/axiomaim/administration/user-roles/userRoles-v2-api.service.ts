import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserRolesDataService } from "./user-roles-data.service";
import { UserRole } from "./user-role.model";

export const UserRolesV2ApiService = createInjectable(() => {
  const _userRolesDataService = inject(UserRolesDataService);
  
  const getAll = async ():Promise<UserRole[]> => {
    const response$ = _userRolesDataService.getAll();
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<UserRole> => {
    const response$ = _userRolesDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: UserRole):Promise<UserRole> => {
    const response$ = _userRolesDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: UserRole):Promise<UserRole> => {
    const response$ = _userRolesDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _userRolesDataService.deleteItem(id);
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
