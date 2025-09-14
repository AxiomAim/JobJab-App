import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ServicesDataService } from "./services-data.service";
import { Service } from "./services.model";

export const ServicesV2ApiService = createInjectable(() => {
  const _servicesDataService = inject(ServicesDataService);
  
  const getAll = async ():Promise<Service[]> => {
    const response$ = _servicesDataService.getAll();
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Service> => {
    const response$ = _servicesDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Service):Promise<Service> => {
    const response$ = _servicesDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Service):Promise<Service> => {
    const response$ = _servicesDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _servicesDataService.deleteItem(id);
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
