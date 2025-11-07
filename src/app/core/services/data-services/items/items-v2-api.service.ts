import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ItemsDataService } from "./items-data.service";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { Item } from "./items.model";

export const ItemsApiV2Service = createInjectable(() => {
  const _itemsDataService = inject(ItemsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();
  
  const getAll = async ():Promise<Item[]> => {
    const response$ = _itemsDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getAllMyEvents = async ():Promise<Item[]> => {
    const response$ = _itemsDataService.getQuery('userId', '==', loginUser.id);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Item> => {
    const response$ = _itemsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Item):Promise<Item> => {
    data.orgId = loginUser.orgId;
    const response$ = _itemsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Item):Promise<Item> => {
    const response$ = _itemsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _itemsDataService.deleteItem(id);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };


  return {
    getAll,
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getAllMyEvents
  };
});
