import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Item } from "./items.model";
import { ItemsApiV2Service } from "./items-v2-api.service";
import { Category } from "app/core/models/categories.model";
import { firstValueFrom, tap } from "rxjs";

export const ItemsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _itemsApiV2Service = inject(ItemsApiV2Service);
  const allItems = signal<Item[] | null>(null);
  const items = signal<Item[] | null>(null);
  const item = signal<Item | null>(null);
  const categories = signal<Category[] | null>(null);

  
  const getAll = async ():Promise<Item[]> => {
    const response = await _itemsApiV2Service.getAll();
    allItems.set(response);
    items.set(response);
    return response;
  };

  const getAllUserAppomitments = async ():Promise<Item[]> => {
    const response = await _itemsApiV2Service.getAll();
    allItems.set(response);
    items.set(response);
    return response;
  };


  const getItem = async (oid: string): Promise<Item> => {
    const response = await _itemsApiV2Service.getItem(oid);
    item.set(response);
    return response;
  };

  const createItem = async (data: Item): Promise<Item> => {
    const response = await _itemsApiV2Service.createItem(data);
    item.set(response);
    return response;
  };

  const updateItem = async (data: Item): Promise<Item> => {
    const response = await _itemsApiV2Service.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _itemsApiV2Service.deleteItem(oid);
    item.set(null);
    return response;
  };

  const setContact = async (thisContact: Item): Promise<Item> => {
    item.set(thisContact);
    return item();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allItems().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      items.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  /**
   * Get categories
   */
  const getCategories = async (): Promise<Category[]> => {
    const allPhoneLabels = await _httpClient
        .get<Category[]>('api/common/categories')
        .pipe(
            tap((categoriesRes: Category[]) => {
              categories.set(categoriesRes);
              return categoriesRes;
            })
        );
        // return null;
    return await firstValueFrom(allPhoneLabels)        
  }

    
  return {
    items: computed(() => items()),
    allItems: computed(() => allItems()),
    item: computed(() => item()),
    categories: computed(() => categories()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
    getAllUserAppomitments,
    getCategories
  };
});
