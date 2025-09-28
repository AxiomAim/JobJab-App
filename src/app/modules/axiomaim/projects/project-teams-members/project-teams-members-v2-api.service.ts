import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ProductsDataService } from "./project-teams-members.service";
import { ProjectTeamMember } from "./project-teams-members.model";

export const ProjectTeamsMembersV2ApiService = createInjectable(() => {
  const _productsDataService = inject(ProductsDataService);
  
  const getAll = async ():Promise<ProjectTeamMember[]> => {
    const response$ = _productsDataService.getAll();
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<ProjectTeamMember> => {
    const response$ = _productsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: ProjectTeamMember):Promise<ProjectTeamMember> => {
    const response$ = _productsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: ProjectTeamMember):Promise<ProjectTeamMember> => {
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
