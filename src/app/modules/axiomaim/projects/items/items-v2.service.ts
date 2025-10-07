import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ItemsV2ApiService } from "./items-v2-api.service";
import { Item } from "./items.model";

const ALL_QUOTES = "allQuotes";
const QUOTES = "quotes";
const QUOTE = "quote";


export const ItemsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _itemsV2ApiService = inject(ItemsV2ApiService);
  const allItems = signal<Item[] | null>(null);
  const items = signal<Item[] | null>(null);
  const item = signal<Item | null>(null);

  const getAll = async ():Promise<Item[]> => {
    const response = await _itemsV2ApiService.getAll();
    allItems.set(response);
    items.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Item> => {
    const response = await _itemsV2ApiService.getItem(oid);
    item.set(response);
    return response;
  };

  const createItem = async (data: Item): Promise<Item> => {
    const response = await _itemsV2ApiService.createItem(data);
    item.set(response);
    return response;
  };

  const updateItem = async (data: Item): Promise<Item> => {
    const response = await _itemsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _itemsV2ApiService.deleteItem(oid);
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
    quotes: computed(() => items()),
    allQuotes: computed(() => allItems()),
    quote: computed(() => item()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
