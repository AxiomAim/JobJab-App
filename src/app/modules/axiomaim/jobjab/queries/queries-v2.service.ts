import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { QueriesV2ApiService } from "./queries-v2-api.service";
import { Query } from "./queries.model";
import { HttpClient } from "@angular/common/http";

export const QueriesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _customersV2ApiService = inject(QueriesV2ApiService);
  const allQueries = signal<Query[] | null>(null);
  const queries = signal<Query[] | null>(null);
  const query = signal<Query | null>(null);

  const getAll = async ():Promise<Query[]> => {
    const response = await _customersV2ApiService.getAll();
    allQueries.set(response);
    queries.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Query> => {
    const response = await _customersV2ApiService.getItem(oid);
    query.set(response);
    return response;
  };

  const createItem = async (data: Query): Promise<Query> => {
    const response = await _customersV2ApiService.createItem(data);
    query.set(response);
    return response;
  };

  const updateItem = async (data: Query): Promise<Query> => {
    const response = await _customersV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _customersV2ApiService.deleteItem(oid);
    query.set(null);
    return response;
  };

  const setContact = async (thisContact: Query): Promise<Query> => {
    query.set(thisContact);
    return query();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allQueries().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      queries.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };
  
      
  return {
    queries: computed(() => queries()),
    allQueries: computed(() => allQueries()),
    query: computed(() => query()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
  };
});
