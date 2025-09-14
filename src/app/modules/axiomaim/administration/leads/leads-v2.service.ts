import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { LeadsV2ApiService } from "./leads-v2-api.service";
import { Lead } from "./leads.model";

const ALL_LEADS = "allLeads";
const LEADS = "leads";
const LEAD = "lead";


export const LeadsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _leadsV2ApiService = inject(LeadsV2ApiService);
  const allLeads = signal<Lead[] | null>(null);
  const leads = signal<Lead[] | null>(null);
  const lead = signal<Lead | null>(null);

  const getAll = async ():Promise<Lead[]> => {
    const response = await _leadsV2ApiService.getAll();
    allLeads.set(response);
    leads.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Lead> => {
    const response = await _leadsV2ApiService.getItem(oid);
    lead.set(response);
    return response;
  };

  const createItem = async (data: Lead): Promise<Lead> => {
    const response = await _leadsV2ApiService.createItem(data);
    lead.set(response);
    return response;
  };

  const updateItem = async (data: Lead): Promise<Lead> => {
    const response = await _leadsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _leadsV2ApiService.deleteItem(oid);
    lead.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allLeads().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      leads.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    leads: computed(() => leads()),
    allLeads: computed(() => allLeads()),
    lead: computed(() => lead()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
