import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Brand } from "./brands.model";
import { BrandsApiV2Service } from "./brands-v2-api.service";

export const BrandsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _brandsApiV2Service = inject(BrandsApiV2Service);
  const allBrands = signal<Brand[] | null>(null);
  const brands = signal<Brand[] | null>(null);
  const brand = signal<Brand | null>(null);

  
  const getAll = async ():Promise<Brand[]> => {
    const response = await _brandsApiV2Service.getAll();
    allBrands.set(response);
    brands.set(response);
    return response;
  };

  const getAllUserAppomitments = async ():Promise<Brand[]> => {
    const response = await _brandsApiV2Service.getAll();
    allBrands.set(response);
    brands.set(response);
    return response;
  };


  const getItem = async (oid: string): Promise<Brand> => {
    const response = await _brandsApiV2Service.getItem(oid);
    brand.set(response);
    return response;
  };

  const createItem = async (data: Brand): Promise<Brand> => {
    const response = await _brandsApiV2Service.createItem(data);
    brand.set(response);
    return response;
  };

  const updateItem = async (data: Brand): Promise<Brand> => {
    const response = await _brandsApiV2Service.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _brandsApiV2Service.deleteItem(oid);
    brand.set(null);
    return response;
  };

  const setContact = async (thisContact: Brand): Promise<Brand> => {
    brand.set(thisContact);
    return brand();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allBrands().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      brands.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

    
  return {
    brands: computed(() => brands()),
    allBrands: computed(() => allBrands()),
    brand: computed(() => brand()),
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
