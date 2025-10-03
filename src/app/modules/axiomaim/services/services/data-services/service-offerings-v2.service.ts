import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceOfferingsV2ApiService } from "./service-offerings-v2-api.service";
import { ServiceOffering } from "./service-offerings.model";

const ALL_SERVICE_OFFERINGS = "allServiceOfferings";
const SERVICE_OFFERINGSS = "serviceOfferings";
const SERVICE_OFFERING = "serviceOffering";

export const ServiceOfferingsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _serviceOfferingsV2ApiService = inject(ServiceOfferingsV2ApiService);
  const allServiceOfferings = signal<ServiceOffering[] | null>(null);
  const serviceOfferings = signal<ServiceOffering[] | null>(null);
  const serviceOffering = signal<ServiceOffering | null>(null);

  const getAll = async ():Promise<ServiceOffering[]> => {
    const response = await _serviceOfferingsV2ApiService.getAll();
    allServiceOfferings.set(response);
    serviceOfferings.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<ServiceOffering> => {
    const response = await _serviceOfferingsV2ApiService.getItem(oid);
    serviceOffering.set(response);
    return response;
  };

  const createItem = async (data: ServiceOffering): Promise<ServiceOffering> => {
    const response = await _serviceOfferingsV2ApiService.createItem(data);
    serviceOffering.set(response);
    return response;
  };

  const updateItem = async (data: ServiceOffering): Promise<ServiceOffering> => {
    const response = await _serviceOfferingsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _serviceOfferingsV2ApiService.deleteItem(oid);
    serviceOffering.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiServiceOffering.updateParticipantItem(data);
      let searchResults = allServiceOfferings().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      serviceOfferings.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    serviceOfferings: computed(() => serviceOfferings()),
    allServiceOfferingOfferings: computed(() => allServiceOfferings()),
    serviceOffering: computed(() => serviceOffering()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
