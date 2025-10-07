import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { CustomersV2ApiService } from "./customers-v2-api.service";
import { Country, Customer } from "./customers.model";
import { BehaviorSubject, firstValueFrom, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

export const CustomersV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _customersV2ApiService = inject(CustomersV2ApiService);
  const allCustomers = signal<Customer[] | null>(null);
  const customers = signal<Customer[] | null>(null);
  const customer = signal<Customer | null>(null);
  const countries = signal<Country | null>(null);

  
  const getAll = async ():Promise<Customer[]> => {
    const response = await _customersV2ApiService.getAll();
    allCustomers.set(response);
    customers.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Customer> => {
    const response = await _customersV2ApiService.getItem(oid);
    customer.set(response);
    return response;
  };

  const createItem = async (data: Customer): Promise<Customer> => {
    const response = await _customersV2ApiService.createItem(data);
    customer.set(response);
    return response;
  };

  const updateItem = async (data: Customer): Promise<Customer> => {
    const response = await _customersV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _customersV2ApiService.deleteItem(oid);
    customer.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allCustomers().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      customers.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  /**
   * Get countries
   */
  const getCountries = async (): Promise<Country[]> => {
    const allCountries = _httpClient
        .get<Country[]>('api/apps/contacts/countries')
        .pipe(
            tap((countries) => {
              return countries
            })
        );
    return await firstValueFrom(allCountries)        
  }
  
  return {
    customers: computed(() => customers()),
    allCustomers: computed(() => allCustomers()),
    customer: computed(() => customer()),
    countries: computed(() => countries()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    getCountries
  };
});
