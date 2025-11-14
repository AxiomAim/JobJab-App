import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Deal } from "./deals.model";
import { DealsApiV2Service } from "./deals-v2-api.service";

export const DealsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _dealsApiV2Service = inject(DealsApiV2Service);
  const allDeals = signal<Deal[] | null>(null);
  const deals = signal<Deal[] | null>(null);
  const deal = signal<Deal | null>(null);

  
  const getAll = async ():Promise<Deal[]> => {
    const response = await _dealsApiV2Service.getAll();
    allDeals.set(response);
    deals.set(response);
    return response;
  };

  const getAllUserAppomitments = async ():Promise<Deal[]> => {
    const response = await _dealsApiV2Service.getAll();
    allDeals.set(response);
    deals.set(response);
    return response;
  };


  const getItem = async (oid: string): Promise<Deal> => {
    const response = await _dealsApiV2Service.getItem(oid);
    deal.set(response);
    return response;
  };

  const createItem = async (data: Deal): Promise<Deal> => {
    const response = await _dealsApiV2Service.createItem(data);
    deal.set(response);
    return response;
  };

  const updateItem = async (data: Deal): Promise<Deal> => {
    const response = await _dealsApiV2Service.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _dealsApiV2Service.deleteItem(oid);
    deal.set(null);
    return response;
  };

  const setContact = async (thisContact: Deal): Promise<Deal> => {
    deal.set(thisContact);
    return deal();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allDeals().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      deals.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

    
  return {
    deals: computed(() => deals()),
    allDeals: computed(() => allDeals()),
    deal: computed(() => deal()),
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
