import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { SubscriptionsDataService } from "./subscriptions-data.service";
import { Subscription } from "./subscriptions.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const SubscriptionsV2ApiService = createInjectable(() => {
  const _subscriptionsDataService = inject(SubscriptionsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();

  const getAll = async ():Promise<Subscription[]> => {
    const response$ = _subscriptionsDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Subscription> => {
    const response$ = _subscriptionsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Subscription):Promise<Subscription> => {
    const response$ = _subscriptionsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Subscription):Promise<Subscription> => {
    const response$ = _subscriptionsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _subscriptionsDataService.deleteItem(id);
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
