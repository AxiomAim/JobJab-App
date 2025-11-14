import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { EmailsDataService } from "./emails-data.service";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { Email } from "./emails.model";

export const EmailsApiV2Service = createInjectable(() => {
  const _emailsDataService = inject(EmailsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();
  
  const getAll = async ():Promise<Email[]> => {
    const response$ = _emailsDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getAllMyEvents = async ():Promise<Email[]> => {
    const response$ = _emailsDataService.getQuery('userId', '==', loginUser.id);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Email> => {
    const response$ = _emailsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Email):Promise<Email> => {
    data.orgId = loginUser.orgId;
    const response$ = _emailsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Email):Promise<Email> => {
    const response$ = _emailsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _emailsDataService.deleteItem(id);
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
