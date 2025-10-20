import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ItemsOffersV2ApiService } from "./items-offers-v2-api.service";
import { ItemsOffer } from "./items-offers.model";

const ALL_QUOTES = "allQuotes";
const QUOTES = "quotes";
const QUOTE = "quote";


export const ItemsOffersV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _itemsOffersV2ApiService = inject(ItemsOffersV2ApiService);
  const allItems = signal<ItemsOffer[] | null>(null);
  const items = signal<ItemsOffer[] | null>(null);
  const item = signal<ItemsOffer | null>(null);

  const getAll = async ():Promise<ItemsOffer[]> => {
    const response = await _itemsOffersV2ApiService.getAll();
    allItems.set(response);
    items.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<ItemsOffer> => {
    const response = await _itemsOffersV2ApiService.getItem(oid);
    item.set(response);
    return response;
  };

  const createItem = async (data: ItemsOffer): Promise<ItemsOffer> => {
    const response = await _itemsOffersV2ApiService.createItem(data);
    item.set(response);
    return response;
  };

  const updateItem = async (data: ItemsOffer): Promise<ItemsOffer> => {
    const response = await _itemsOffersV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _itemsOffersV2ApiService.deleteItem(oid);
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
