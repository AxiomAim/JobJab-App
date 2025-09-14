import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { CustomersV2ApiService } from "./customers-v2-api.service";
import { Customer } from "./customers.model";

const ALL_CUSTOMERS = "allCustomers";
const CUSTOMERS = "customers";
const CUSTOMER = "customer";


export const CustomersV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _customersV2ApiService = inject(CustomersV2ApiService);
  const allCustomers = signal<Customer[] | null>(null);
  const customers = signal<Customer[] | null>(null);
  const customer = signal<Customer | null>(null);

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
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      customers.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    customers: computed(() => customers()),
    allCustomers: computed(() => allCustomers()),
    customer: computed(() => customer()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
