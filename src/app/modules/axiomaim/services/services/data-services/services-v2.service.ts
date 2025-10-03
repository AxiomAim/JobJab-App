import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ServicesV2ApiService } from "./services-v2-api.service";
import { Service } from "./services.model";
import { 
  WhereFilterOp
} from '@angular/fire/firestore';


const ALL_SERVICES = "allServices";
const SERVICES = "services";
const SERVICE = "service";


export const ServicesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _servicesV2ApiService = inject(ServicesV2ApiService);
  const allServices = signal<Service[] | null>(null);
  const services = signal<Service[] | null>(null);
  const service = signal<Service | null>(null);

  const getAll = async ():Promise<Service[]> => {
    const response = await _servicesV2ApiService.getAll();
    allServices.set(response);
    services.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Service> => {
    const response = await _servicesV2ApiService.getItem(oid);
    service.set(response);
    return response;
  };

  const createItem = async (data: Service): Promise<Service> => {
    const response = await _servicesV2ApiService.createItem(data);
    service.set(response);
    return response;
  };

  const updateItem = async (data: Service): Promise<Service> => {
    const response = await _servicesV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _servicesV2ApiService.deleteItem(oid);
    service.set(null);
    return response;
  };

    const getQuery = async (fieldName: string, operator: WhereFilterOp, value: string):Promise<Service[]> => {
      const response = await _servicesV2ApiService.getQuery(fieldName, operator, value);
      allServices.set(response);
      services.set(response);
      return response;
    };
  

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allServices().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      services.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    services: computed(() => services()),
    allServices: computed(() => allServices()),
    service: computed(() => service()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    getQuery
  };
});
