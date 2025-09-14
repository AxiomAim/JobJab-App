import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { TechniciansV2ApiService } from "./technicians-v2-api.service";
import { Technician } from "./technicians.model";

const ALL_TECHNICIANS = "allTechnicians";
const TECHNICIANS = "technicians";
const TECHNICIAN = "technician";


export const TechniciansV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _techniciansV2ApiService = inject(TechniciansV2ApiService);
  const allTechnicians = signal<Technician[] | null>(null);
  const technicians = signal<Technician[] | null>(null);
  const technician = signal<Technician | null>(null);

  const getAll = async ():Promise<Technician[]> => {
    const response = await _techniciansV2ApiService.getAll();
    allTechnicians.set(response);
    technicians.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Technician> => {
    const response = await _techniciansV2ApiService.getItem(oid);
    technician.set(response);
    return response;
  };

  const createItem = async (data: Technician): Promise<Technician> => {
    const response = await _techniciansV2ApiService.createItem(data);
    technician.set(response);
    return response;
  };

  const updateItem = async (data: Technician): Promise<Technician> => {
    const response = await _techniciansV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _techniciansV2ApiService.deleteItem(oid);
    technician.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allTechnicians().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      technicians.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    technicians: computed(() => technicians()),
    allTechnicians: computed(() => allTechnicians()),
    technician: computed(() => technician()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
