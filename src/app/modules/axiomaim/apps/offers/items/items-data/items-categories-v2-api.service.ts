import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ItemsCategoriesDataService } from "./items-categories-data.service";
import { ItemsCategory } from "./items-categories.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const ItemsCategoriesV2ApiService = createInjectable(() => {
  const _itemsCategoriesDataService = inject(ItemsCategoriesDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();

  const getAll = async ():Promise<ItemsCategory[]> => {
    const response$ = _itemsCategoriesDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<ItemsCategory> => {
    const response$ = _itemsCategoriesDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: ItemsCategory):Promise<ItemsCategory> => {
    data.orgId = loginUser.orgId;
    const response$ = _itemsCategoriesDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: ItemsCategory):Promise<ItemsCategory> => {
    const response$ = _itemsCategoriesDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _itemsCategoriesDataService.deleteItem(id);
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
