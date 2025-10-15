import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { SourcesV2ApiService } from "./sources-v2-api.service";
import { Source } from "./sources.model";
import { firstValueFrom, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

export const SourcesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _sourcesV2ApiService = inject(SourcesV2ApiService);
  const allSources = signal<Source[] | null>(null);
  const sources = signal<Source[] | null>(null);
  const source = signal<Source | null>(null);

  
  const getAll = async ():Promise<Source[]> => {
    const response = await _sourcesV2ApiService.getAll();
    allSources.set(response);
    sources.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Source> => {
    const response = await _sourcesV2ApiService.getItem(oid);
    source.set(response);
    return response;
  };

  const createItem = async (data: Source): Promise<Source> => {
    const response = await _sourcesV2ApiService.createItem(data);
    source.set(response);
    return response;
  };

  const updateItem = async (data: Source): Promise<Source> => {
    const response = await _sourcesV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _sourcesV2ApiService.deleteItem(oid);
    source.set(null);
    return response;
  };

  const setContact = async (thisContact: Source): Promise<Source> => {
    source.set(thisContact);
    return source();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allSources().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      sources.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  
  return {
    sources: computed(() => sources()),
    allSources: computed(() => allSources()),
    source: computed(() => source()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
  };
});
