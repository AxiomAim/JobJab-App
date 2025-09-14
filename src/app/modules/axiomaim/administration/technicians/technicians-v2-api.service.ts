import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { TechniciansDataService } from "./technicians-data.service";
import { Technician } from "./technicians.model";

export const TechniciansV2ApiService = createInjectable(() => {
  const _techniciansDataService = inject(TechniciansDataService);
  
  const getAll = async ():Promise<Technician[]> => {
    const response$ = _techniciansDataService.getAll();
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Technician> => {
    const response$ = _techniciansDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Technician):Promise<Technician> => {
    const response$ = _techniciansDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Technician):Promise<Technician> => {
    const response$ = _techniciansDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _techniciansDataService.deleteItem(id);
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
