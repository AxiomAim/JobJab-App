import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { PipelinesV2ApiService } from "./pipelines-v2-api.service";
import { Pipeline } from "./pipelines.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { User } from "../../administration/users/users.model";


export const PipelinesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
  const _pipelinesV2ApiService = inject(PipelinesV2ApiService);
  const loginUser = signal<User | null>(_firebaseAuthV2Service.loginUser());
  const allPipelines = signal<Pipeline[] | null>(null);
  const pipelines = signal<Pipeline[] | null>(null);
  const pipeline = signal<Pipeline | null>(null);

  const getAll = async ():Promise<Pipeline[]> => {
    const response = await _pipelinesV2ApiService.getAll();
    allPipelines.set(response);
    pipelines.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Pipeline> => {
    const response = await _pipelinesV2ApiService.getItem(oid);
    pipeline.set(response);
    return response;
  };

  const createItem = async (data: Pipeline): Promise<Pipeline> => {
    data.orgId = loginUser().orgId;
    data.userId = loginUser().id;
    const response = await _pipelinesV2ApiService.createItem(data);
    pipeline.set(response);
    return response;
  };

  const updateItem = async (data: Pipeline): Promise<Pipeline> => {
    const response = await _pipelinesV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _pipelinesV2ApiService.deleteItem(oid);
    pipeline.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allPipelines().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      pipelines.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    pipelines: computed(() => pipelines()),
    allPipelines: computed(() => allPipelines()),
    pipeline: computed(() => pipeline()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
