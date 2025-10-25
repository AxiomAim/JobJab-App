import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ItemsOffersDataService } from "./items-offers-data.service";
import { ItemsOffer } from "./items-offers.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const ItemsOffersV2ApiService = createInjectable(() => {
  const _itemsOffersDataService = inject(ItemsOffersDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();

  const getAll = async ():Promise<ItemsOffer[]> => {
    const response$ = _itemsOffersDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<ItemsOffer> => {
    const response$ = _itemsOffersDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: ItemsOffer):Promise<ItemsOffer> => {
    data.orgId = loginUser.orgId;
    const response$ = _itemsOffersDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: ItemsOffer):Promise<ItemsOffer> => {
    const response$ = _itemsOffersDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _itemsOffersDataService.deleteItem(id);
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
