import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ItemsBrandsV2ApiService } from "./items-brands-v2-api.service";
import { ItemsBrand } from "./items-brands.model";

const ALL_QUOTES = "allQuotes";
const QUOTES = "quotes";
const QUOTE = "quote";


export const ItemsBrandsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _itemsBrandsV2ApiService = inject(ItemsBrandsV2ApiService);
  const allItems = signal<ItemsBrand[] | null>(null);
  const items = signal<ItemsBrand[] | null>(null);
  const item = signal<ItemsBrand | null>(null);

  const getAll = async ():Promise<ItemsBrand[]> => {
    const response = await _itemsBrandsV2ApiService.getAll();
    allItems.set(response);
    items.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<ItemsBrand> => {
    const response = await _itemsBrandsV2ApiService.getItem(oid);
    item.set(response);
    return response;
  };

  const createItem = async (data: ItemsBrand): Promise<ItemsBrand> => {
    const response = await _itemsBrandsV2ApiService.createItem(data);
    item.set(response);
    return response;
  };

  const updateItem = async (data: ItemsBrand): Promise<ItemsBrand> => {
    const response = await _itemsBrandsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _itemsBrandsV2ApiService.deleteItem(oid);
    item.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allItems().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      items.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    items: computed(() => items()),
    allItems: computed(() => allItems()),
    item: computed(() => item()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
