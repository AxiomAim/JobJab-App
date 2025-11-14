import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { DealsDataService } from "./deals-data.service";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { Deal } from "./deals.model";

export const DealsApiV2Service = createInjectable(() => {
  const _dealsDataService = inject(DealsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();
  
  const getAll = async ():Promise<Deal[]> => {
    const response$ = _dealsDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getAllMyEvents = async ():Promise<Deal[]> => {
    const response$ = _dealsDataService.getQuery('userId', '==', loginUser.id);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Deal> => {
    const response$ = _dealsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Deal):Promise<Deal> => {
    data.orgId = loginUser.orgId;
    const response$ = _dealsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Deal):Promise<Deal> => {
    const response$ = _dealsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _dealsDataService.deleteItem(id);
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
