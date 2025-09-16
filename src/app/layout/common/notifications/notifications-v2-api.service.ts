import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { NotificationsDataService } from "./notifications-data.service";
import { Notification } from "./notifications.model";

export const NotificationsV2ApiService = createInjectable(() => {
  const _notificationsDataService = inject(NotificationsDataService);
  
  const getAll = async ():Promise<Notification[]> => {
    const response$ = _notificationsDataService.getAll();
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Notification> => {
    const response$ = _notificationsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Notification):Promise<Notification> => {
    const response$ = _notificationsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Notification):Promise<Notification> => {
    const response$ = _notificationsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _notificationsDataService.deleteItem(id);
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
