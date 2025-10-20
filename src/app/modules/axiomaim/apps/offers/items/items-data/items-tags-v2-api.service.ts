import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ItemsTagsDataService } from "./items-tags-data.service";
import { ItemsTag } from "./items-tags.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const ItemsTagsV2ApiService = createInjectable(() => {
  const _itemsTagsDataService = inject(ItemsTagsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();

  const getAll = async ():Promise<ItemsTag[]> => {
    const response$ = _itemsTagsDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<ItemsTag> => {
    const response$ = _itemsTagsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: ItemsTag):Promise<ItemsTag> => {
    data.orgId = loginUser.orgId;
    const response$ = _itemsTagsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: ItemsTag):Promise<ItemsTag> => {
    const response$ = _itemsTagsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _itemsTagsDataService.deleteItem(id);
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
