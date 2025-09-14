import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { OrganizationsV2ApiService } from "./organizations-v2-api.service";
import { Organization } from "./organizations.model";

const ALL_ORGANIZATIONS = "allOrganizations";
const ORGANIZATIONS = "organizations";
const ORGANIZATION = "organization";


export const OrganizationsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _organizationsV2ApiService = inject(OrganizationsV2ApiService);
  const allOrganizations = signal<Organization[] | null>(null);
  const organizations = signal<Organization[] | null>(null);
  const organization = signal<Organization | null>(null);

  const getAll = async ():Promise<Organization[]> => {
    const response = await _organizationsV2ApiService.getAll();
    allOrganizations.set(response);
    organizations.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Organization> => {
    const response = await _organizationsV2ApiService.getItem(oid);
    organization.set(response);
    return response;
  };

  const createItem = async (data: Organization): Promise<Organization> => {
    const response = await _organizationsV2ApiService.createItem(data);
    organization.set(response);
    return response;
  };

  const updateItem = async (data: Organization): Promise<Organization> => {
    const response = await _organizationsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _organizationsV2ApiService.deleteItem(oid);
    organization.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allOrganizations().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      organizations.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    organizations: computed(() => organizations()),
    allOrganizations: computed(() => allOrganizations()),
    organization: computed(() => organization()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
