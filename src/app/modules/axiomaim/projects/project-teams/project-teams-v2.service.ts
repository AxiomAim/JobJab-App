import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ProjectTeamsV2ApiService } from "./project-teams-v2-api.service";
import { ProjectTeam } from "./project-teams.model";


export const ProjectTeamsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _projectTeamsV2ApiService = inject(ProjectTeamsV2ApiService);
  const allProducts = signal<ProjectTeam[] | null>(null);
  const projectTeams = signal<ProjectTeam[] | null>(null);
  const projectTeam = signal<ProjectTeam | null>(null);

  const getAll = async ():Promise<ProjectTeam[]> => {
    const response = await _projectTeamsV2ApiService.getAll();
    allProducts.set(response);
    projectTeams.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<ProjectTeam> => {
    const response = await _projectTeamsV2ApiService.getItem(oid);
    projectTeam.set(response);
    return response;
  };

  const createItem = async (data: ProjectTeam): Promise<ProjectTeam> => {
    const response = await _projectTeamsV2ApiService.createItem(data);
    projectTeam.set(response);
    return response;
  };

  const updateItem = async (data: ProjectTeam): Promise<ProjectTeam> => {
    const response = await _projectTeamsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _projectTeamsV2ApiService.deleteItem(oid);
    projectTeam.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allProducts().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      projectTeams.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    projectTeams: computed(() => projectTeams()),
    allProducts: computed(() => allProducts()),
    projectTeam: computed(() => projectTeam()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
