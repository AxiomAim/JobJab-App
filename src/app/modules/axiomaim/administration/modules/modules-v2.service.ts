import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ModulesV2ApiService } from "./modules-v2-api.service";
import { Module } from "./modules.model";
import { firstValueFrom, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

export const ModulesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _modulesV2ApiService = inject(ModulesV2ApiService);
  const allModules = signal<Module[] | null>(null);
  const modules = signal<Module[] | null>(null);
  const module = signal<Module | null>(null);

  
  const getAll = async ():Promise<Module[]> => {
    const response = await _modulesV2ApiService.getAll();
    allModules.set(response);
    modules.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Module> => {
    const response = await _modulesV2ApiService.getItem(oid);
    module.set(response);
    return response;
  };

  const createItem = async (data: Module): Promise<Module> => {
    const response = await _modulesV2ApiService.createItem(data);
    module.set(response);
    return response;
  };

  const updateItem = async (data: Module): Promise<Module> => {
    const response = await _modulesV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _modulesV2ApiService.deleteItem(oid);
    module.set(null);
    return response;
  };

  const setContact = async (thisContact: Module): Promise<Module> => {
    module.set(thisContact);
    return module();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allModules().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      modules.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  
  return {
    modules: computed(() => modules()),
    allModules: computed(() => allModules()),
    module: computed(() => module()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
  };
});
