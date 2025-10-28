import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Category } from "./cetagories.model";
import { CategoriesApiV2Service } from "./cetagories-v2-api.service";

export const CategoriesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _categoriesApiV2Service = inject(CategoriesApiV2Service);
  const allCategories = signal<Category[] | null>(null);
  const categories = signal<Category[] | null>(null);
  const category = signal<Category | null>(null);

  
  const getAll = async ():Promise<Category[]> => {
    const response = await _categoriesApiV2Service.getAll();
    allCategories.set(response);
    categories.set(response);
    return response;
  };

  const getAllUserAppomitments = async ():Promise<Category[]> => {
    const response = await _categoriesApiV2Service.getAll();
    allCategories.set(response);
    categories.set(response);
    return response;
  };


  const getItem = async (oid: string): Promise<Category> => {
    const response = await _categoriesApiV2Service.getItem(oid);
    category.set(response);
    return response;
  };

  const createItem = async (data: Category): Promise<Category> => {
    const response = await _categoriesApiV2Service.createItem(data);
    category.set(response);
    return response;
  };

  const updateItem = async (data: Category): Promise<Category> => {
    const response = await _categoriesApiV2Service.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _categoriesApiV2Service.deleteItem(oid);
    category.set(null);
    return response;
  };

  const setContact = async (thisContact: Category): Promise<Category> => {
    category.set(thisContact);
    return category();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allCategories().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      categories.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

    
  return {
    categories: computed(() => categories()),
    allCategories: computed(() => allCategories()),
    category: computed(() => category()),
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
