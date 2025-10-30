import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Request } from "./requests.model";
import { RequestsApiV2Service } from "./requests-v2-api.service";

export const RequestsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _requestsApiV2Service = inject(RequestsApiV2Service);
  const allRequests = signal<Request[] | null>(null);
  const requests = signal<Request[] | null>(null);
  const request = signal<Request | null>(null);

  
  const getAll = async ():Promise<Request[]> => {
    const response = await _requestsApiV2Service.getAll();
    allRequests.set(response);
    requests.set(response);
    return response;
  };

  const getAllUserAppomitments = async ():Promise<Request[]> => {
    const response = await _requestsApiV2Service.getAll();
    allRequests.set(response);
    requests.set(response);
    return response;
  };


  const getItem = async (oid: string): Promise<Request> => {
    const response = await _requestsApiV2Service.getItem(oid);
    request.set(response);
    return response;
  };

  const createItem = async (data: Request): Promise<Request> => {
    const response = await _requestsApiV2Service.createItem(data);
    request.set(response);
    return response;
  };

  const updateItem = async (data: Request): Promise<Request> => {
    const response = await _requestsApiV2Service.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _requestsApiV2Service.deleteItem(oid);
    request.set(null);
    return response;
  };

  const setContact = async (thisContact: Request): Promise<Request> => {
    request.set(thisContact);
    return request();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allRequests().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      requests.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

    
  return {
    requests: computed(() => requests()),
    allRequests: computed(() => allRequests()),
    request: computed(() => request()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
    getAllUserAppomitments
  };
});
