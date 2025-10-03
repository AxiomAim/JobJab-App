import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ProjectTeam } from "./project-teams.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { ProjectTeamsDataService } from "./project-teams-data.service";

export const ProjectTeamsV2ApiService = createInjectable(() => {
  const _projectTeamsDataService = inject(ProjectTeamsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();

  const getAll = async ():Promise<ProjectTeam[]> => {
    const response$ = _projectTeamsDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<ProjectTeam> => {
    const response$ = _projectTeamsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: ProjectTeam):Promise<ProjectTeam> => {
    const response$ = _projectTeamsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: ProjectTeam):Promise<ProjectTeam> => {
    const response$ = _projectTeamsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _projectTeamsDataService.deleteItem(id);
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
