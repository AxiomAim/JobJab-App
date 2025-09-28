import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ServiceOfferingList } from "./service-offerings-list.model";
import { ServiceOfferingsListV2ApiService } from "./service-offerings-list-v2-api.service";
import { 
  WhereFilterOp
} from '@angular/fire/firestore';

const ALL_SERVICE_OFFERINGS_LIST = "allServiceOfferingListsList";
const SERVICE_OFFERINGSS_LIST = "serviceOfferingsList";
const SERVICE_OFFERING_LIST = "serviceOfferingsList";

export const ServiceOfferingListV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _serviceOfferingsListV2ApiService = inject(ServiceOfferingsListV2ApiService);
  const allServiceOfferingList = signal<ServiceOfferingList[] | null>(null);
  const serviceOfferingsList = signal<ServiceOfferingList[] | null>(null);
  const serviceOfferingList = signal<ServiceOfferingList | null>(null);

  const getAll = async ():Promise<ServiceOfferingList[]> => {
    const response = await _serviceOfferingsListV2ApiService.getAll();
    console.log('Get All Response', response);
    allServiceOfferingList.set(response);
    serviceOfferingsList.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<ServiceOfferingList> => {
    const response = await _serviceOfferingsListV2ApiService.getItem(oid);
    serviceOfferingList.set(response);
    return response;
  };

  const createItem = async (data: ServiceOfferingList): Promise<ServiceOfferingList> => {
    const response = await _serviceOfferingsListV2ApiService.createItem(data);
    serviceOfferingList.set(response);
    return response;
  };

  const updateItem = async (data: ServiceOfferingList): Promise<ServiceOfferingList> => {
    const response = await _serviceOfferingsListV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _serviceOfferingsListV2ApiService.deleteItem(oid);
    serviceOfferingList.set(null);
    return response;
  };

  const getQuery = async (fieldName: string, operator: WhereFilterOp, value: string):Promise<ServiceOfferingList[]> => {
    const response = await _serviceOfferingsListV2ApiService.getQuery(fieldName, operator, value);
    allServiceOfferingList.set(response);
    serviceOfferingsList.set(response);
    return response;
  };


  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiServiceOfferingList.updateParticipantItem(data);
      let searchResults = allServiceOfferingList().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      serviceOfferingsList.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    serviceOfferings: computed(() => serviceOfferingsList()),
    allServiceOfferingList: computed(() => allServiceOfferingList()),
    serviceOfferingList: computed(() => allServiceOfferingList()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    getQuery
  };
});
