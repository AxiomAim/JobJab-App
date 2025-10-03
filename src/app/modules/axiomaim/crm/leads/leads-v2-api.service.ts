import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { LeadsDataService } from "./leads-data.service";
import { Lead } from "./leads.model";

export const LeadsV2ApiService = createInjectable(() => {
  const _leadsDataService = inject(LeadsDataService);
  
  const getAll = async ():Promise<Lead[]> => {
    const response$ = _leadsDataService.getAll();
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Lead> => {
    const response$ = _leadsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Lead):Promise<Lead> => {
    const response$ = _leadsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Lead):Promise<Lead> => {
    const response$ = _leadsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _leadsDataService.deleteItem(id);
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
