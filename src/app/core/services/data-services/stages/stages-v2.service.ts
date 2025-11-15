import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Stage } from "./stages.model";
import { StagesApiV2Service } from "./stages-v2-api.service";

export const StagesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _stagesApiV2Service = inject(StagesApiV2Service);
  const allStages = signal<Stage[] | null>(null);
  const stages = signal<Stage[] | null>(null);
  const stage = signal<Stage | null>(null);

  
  const getAll = async ():Promise<Stage[]> => {
    const response = await _stagesApiV2Service.getAll();
    const sortedResponse = [...response].sort((a, b) => a.percent - b.percent);    
    allStages.set(sortedResponse);
    stages.set(sortedResponse);
    return response;
  };

  const getAllUserAppomitments = async ():Promise<Stage[]> => {
    const response = await _stagesApiV2Service.getAll();
    allStages.set(response);
    stages.set(response);
    return response;
  };


  const getItem = async (oid: string): Promise<Stage> => {
    const response = await _stagesApiV2Service.getItem(oid);
    stage.set(response);
    return response;
  };

  const createItem = async (data: Stage): Promise<Stage> => {
    const response = await _stagesApiV2Service.createItem(data);
    stage.set(response);
    return response;
  };

  const updateItem = async (data: Stage): Promise<Stage> => {
    const response = await _stagesApiV2Service.updateItem(data);
    return response;
  };

  const deleteItem = async (id: string): Promise<any> => {
    const response = await _stagesApiV2Service.deleteItem(id);
    stage.set(null);
    return response;
  };

  const setContact = async (thisContact: Stage): Promise<Stage> => {
    stage.set(thisContact);
    return stage();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allStages().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      stages.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

    // New method: Reorder stages in-memory
  const reorder = (newStages: Stage[]): void => {
    stages.set(newStages);
    allStages.set(newStages);
  };

  // New method: Bulk update stages (for persistence after reorder)
  const bulkUpdate = async (updates: Partial<Stage>[]): Promise<Stage[]> => {
    const response = await _stagesApiV2Service.bulkUpdate(updates);
    stage.set(null);
    return response;
  };

  return {
    stages: computed(() => stages()),
    allStages: computed(() => allStages()),
    stage: computed(() => stage()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
    getAllUserAppomitments,
    reorder,
    bulkUpdate
  };
});
