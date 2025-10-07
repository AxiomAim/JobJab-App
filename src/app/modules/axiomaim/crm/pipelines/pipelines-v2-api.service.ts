import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { PipelinesDataService } from "./pipelines-data.service";
import { Pipeline } from "./pipelines.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const PipelinesV2ApiService = createInjectable(() => {
  const _pipelinesDataService = inject(PipelinesDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();

  const getAll = async ():Promise<Pipeline[]> => {
    const response$ = _pipelinesDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };


  const getItem = async (id):Promise<Pipeline> => {
    const response$ = _pipelinesDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Pipeline):Promise<Pipeline> => {
    data.orgId = loginUser.orgId;
    const response$ = _pipelinesDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Pipeline):Promise<Pipeline> => {
    const response$ = _pipelinesDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _pipelinesDataService.deleteItem(id);
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
