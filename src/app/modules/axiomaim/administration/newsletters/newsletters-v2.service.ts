import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { NewslettersV2ApiService } from "./newsletters-v2-api.service";
import { Newsletter } from "./newsletters.model";
import { firstValueFrom, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

export const NewslettersV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _customersV2ApiService = inject(NewslettersV2ApiService);
  const allNewsletters = signal<Newsletter[] | null>(null);
  const newsletters = signal<Newsletter[] | null>(null);
  const newsletter = signal<Newsletter | null>(null);

  
  const getAll = async ():Promise<Newsletter[]> => {
    const response = await _customersV2ApiService.getAll();
    allNewsletters.set(response);
    newsletters.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Newsletter> => {
    const response = await _customersV2ApiService.getItem(oid);
    newsletter.set(response);
    return response;
  };

  const createItem = async (data: Newsletter): Promise<Newsletter> => {
    const response = await _customersV2ApiService.createItem(data);
    newsletter.set(response);
    return response;
  };

  const updateItem = async (data: Newsletter): Promise<Newsletter> => {
    const response = await _customersV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _customersV2ApiService.deleteItem(oid);
    newsletter.set(null);
    return response;
  };

  const setContact = async (thisContact: Newsletter): Promise<Newsletter> => {
    newsletter.set(thisContact);
    return newsletter();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allNewsletters().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      newsletters.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };
  
  return {
    newsletters: computed(() => newsletters()),
    newslettercts: computed(() => allNewsletters()),
    newsletter: computed(() => newsletter()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
  };
});
