import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UsersDataService } from "./services-data.service";
import { User } from "./services.model";

export const UsersV2ApiService = createInjectable(() => {
  const _usersDataService = inject(UsersDataService);
  
  const getAll = async ():Promise<User[]> => {
    const response$ = _usersDataService.getAll();
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<User> => {
    const response$ = _usersDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: User):Promise<User> => {
    const response$ = _usersDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: User):Promise<User> => {
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
