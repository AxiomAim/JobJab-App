import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { MessagesDataService } from "./messages-data.service";
import { Message } from "./messages.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const MessagesV2ApiService = createInjectable(() => {
  const _messagesDataService = inject(MessagesDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();
  
  const getAll = async ():Promise<Message[]> => {
    const response$ = _messagesDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Message> => {
    const response$ = _messagesDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Message):Promise<Message> => {
    data.orgId = loginUser.orgId;
    const response$ = _messagesDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Message):Promise<Message> => {
    const response$ = _messagesDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _messagesDataService.deleteItem(id);
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
