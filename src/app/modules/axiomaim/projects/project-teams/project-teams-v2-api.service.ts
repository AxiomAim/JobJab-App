import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ProductsDataService } from "./project-teams.service";
import { ProjectTeam } from "./project-teams.model";

export const ProjectTeamsV2ApiService = createInjectable(() => {
  const _productsDataService = inject(ProductsDataService);
  
  const getAll = async ():Promise<ProjectTeam[]> => {
    const response$ = _productsDataService.getAll();
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<ProjectTeam> => {
    const response$ = _productsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: ProjectTeam):Promise<ProjectTeam> => {
    const response$ = _productsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: ProjectTeam):Promise<ProjectTeam> => {
    const response$ = _productsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _productsDataService.deleteItem(id);
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
