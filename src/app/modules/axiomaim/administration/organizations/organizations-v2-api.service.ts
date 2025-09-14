import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { OrganizationsDataService } from "./organizations-data.service";
import { Organization } from "./organizations.model";

export const OrganizationsV2ApiService = createInjectable(() => {
  const _organizationsDataService = inject(OrganizationsDataService);
  
  const getAll = async ():Promise<Organization[]> => {
    const response$ = _organizationsDataService.getAll();
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Organization> => {
    const response$ = _organizationsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Organization):Promise<Organization> => {
    const response$ = _organizationsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Organization):Promise<Organization> => {
    const response$ = _organizationsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _organizationsDataService.deleteItem(id);
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
