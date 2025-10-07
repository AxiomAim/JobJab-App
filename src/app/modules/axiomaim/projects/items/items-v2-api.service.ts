import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ItemsDataService } from "./items-data.service";
import { Item } from "./items.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const ItemsV2ApiService = createInjectable(() => {
  const _quotesDataService = inject(ItemsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();

  const getAll = async ():Promise<Item[]> => {
    const response$ = _quotesDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Item> => {
    const response$ = _quotesDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Item):Promise<Item> => {
    data.orgId = loginUser.orgId;
    const response$ = _quotesDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Item):Promise<Item> => {
    const response$ = _quotesDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _quotesDataService.deleteItem(id);
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
