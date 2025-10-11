import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { NewslettersDataService } from "./newsletters-data.service";
import { Newsletter } from "./newsletters.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const NewslettersV2ApiService = createInjectable(() => {
  const _customersDataService = inject(NewslettersDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();
  
  const getAll = async ():Promise<Newsletter[]> => {
    const response$ = _customersDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Newsletter> => {
    const response$ = _customersDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Newsletter):Promise<Newsletter> => {
    data.orgId = loginUser.orgId;
    const response$ = _customersDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Newsletter):Promise<Newsletter> => {
    const response$ = _customersDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _customersDataService.deleteItem(id);
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
