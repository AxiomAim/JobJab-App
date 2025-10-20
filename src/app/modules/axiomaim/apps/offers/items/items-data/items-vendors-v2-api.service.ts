import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ItemsVendorsDataService } from "./items-vendors-data.service";
import { ItemsVendor } from "./items-vendors.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const ItemsVendorsV2ApiService = createInjectable(() => {
  const _itemsVendorsDataService = inject(ItemsVendorsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();

  const getAll = async ():Promise<ItemsVendor[]> => {
    const response$ = _itemsVendorsDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<ItemsVendor> => {
    const response$ = _itemsVendorsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: ItemsVendor):Promise<ItemsVendor> => {
    data.orgId = loginUser.orgId;
    const response$ = _itemsVendorsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: ItemsVendor):Promise<ItemsVendor> => {
    const response$ = _itemsVendorsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _itemsVendorsDataService.deleteItem(id);
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
