import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { MyEventsDataService } from "./my-events-data.service";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { MyEvent } from "./my-events.model";

export const MyEventsApiV2Service = createInjectable(() => {
  const _myEventsDataService = inject(MyEventsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();
  
  const getAll = async ():Promise<MyEvent[]> => {
    const response$ = _myEventsDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getAllMyEvents = async ():Promise<MyEvent[]> => {
    const response$ = _myEventsDataService.getQuery('userId', '==', loginUser.id);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<MyEvent> => {
    const response$ = _myEventsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: MyEvent):Promise<MyEvent> => {
    data.orgId = loginUser.orgId;
    const response$ = _myEventsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: MyEvent):Promise<MyEvent> => {
    const response$ = _myEventsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _myEventsDataService.deleteItem(id);
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
