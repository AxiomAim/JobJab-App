import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Vendor } from "./vendors.model";
import { VendorsApiV2Service } from "./vendors-v2-api.service";

export const VendorsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _vendorsApiV2Service = inject(VendorsApiV2Service);
  const allVendors = signal<Vendor[] | null>(null);
  const vendors = signal<Vendor[] | null>(null);
  const vendor = signal<Vendor | null>(null);

  
  const getAll = async ():Promise<Vendor[]> => {
    const response = await _vendorsApiV2Service.getAll();
    allVendors.set(response);
    vendors.set(response);
    return response;
  };

  const getAllUserAppomitments = async ():Promise<Vendor[]> => {
    const response = await _vendorsApiV2Service.getAll();
    allVendors.set(response);
    vendors.set(response);
    return response;
  };


  const getItem = async (oid: string): Promise<Vendor> => {
    const response = await _vendorsApiV2Service.getItem(oid);
    vendor.set(response);
    return response;
  };

  const createItem = async (data: Vendor): Promise<Vendor> => {
    const response = await _vendorsApiV2Service.createItem(data);
    vendor.set(response);
    return response;
  };

  const updateItem = async (data: Vendor): Promise<Vendor> => {
    const response = await _vendorsApiV2Service.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _vendorsApiV2Service.deleteItem(oid);
    vendor.set(null);
    return response;
  };

  const setContact = async (thisContact: Vendor): Promise<Vendor> => {
    vendor.set(thisContact);
    return vendor();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allVendors().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      vendors.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

    
  return {
    vendors: computed(() => vendors()),
    allVendors: computed(() => allVendors()),
    vendor: computed(() => vendor()),
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
