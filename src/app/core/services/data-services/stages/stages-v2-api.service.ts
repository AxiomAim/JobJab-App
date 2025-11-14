import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { StagesDataService } from "./stages-data.service";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { Stage } from "./stages.model";

export const StagesApiV2Service = createInjectable(() => {
  const _stagesDataService = inject(StagesDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();
  
  const getAll = async ():Promise<Stage[]> => {
    const response$ = _stagesDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getAllMyEvents = async ():Promise<Stage[]> => {
    const response$ = _stagesDataService.getQuery('userId', '==', loginUser.id);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Stage> => {
    const response$ = _stagesDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Stage):Promise<Stage> => {
    data.orgId = loginUser.orgId;
    const response$ = _stagesDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Stage):Promise<Stage> => {
    const response$ = _stagesDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _stagesDataService.deleteItem(id);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };
  
const bulkUpdate = async (updates: Partial<Stage>[]): Promise<Stage[]> => {
  const response$ = _stagesDataService.bulkUpdate(updates);
  return firstValueFrom(response$);
};

  return {
    getAll,
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getAllMyEvents,
    bulkUpdate
  };
});
