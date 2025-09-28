import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ServiceOffering } from "./service-offerings.model";
import { ServiceOfferingsDataService } from "./service-offerings-data.service";

export const ServiceOfferingsV2ApiService = createInjectable(() => {
  const _serviceOfferingsDataService = inject(ServiceOfferingsDataService);
  
  const getAll = async ():Promise<ServiceOffering[]> => {
    const response$ = _serviceOfferingsDataService.getAll();
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<ServiceOffering> => {
    const response$ = _serviceOfferingsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: ServiceOffering):Promise<ServiceOffering> => {
    const response$ = _serviceOfferingsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: ServiceOffering):Promise<ServiceOffering> => {
    const response$ = _serviceOfferingsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _serviceOfferingsDataService.deleteItem(id);
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
