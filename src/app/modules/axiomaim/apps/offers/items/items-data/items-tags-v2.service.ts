import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ItemsTagsV2ApiService } from "./items-tags-v2-api.service";
import { ItemsTag } from "./items-tags.model";

const ALL_QUOTES = "allQuotes";
const QUOTES = "quotes";
const QUOTE = "quote";


export const ItemsTagsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _itemsTagsV2ApiService = inject(ItemsTagsV2ApiService);
  const allItems = signal<ItemsTag[] | null>(null);
  const items = signal<ItemsTag[] | null>(null);
  const item = signal<ItemsTag | null>(null);

  const getAll = async ():Promise<ItemsTag[]> => {
    const response = await _itemsTagsV2ApiService.getAll();
    allItems.set(response);
    items.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<ItemsTag> => {
    const response = await _itemsTagsV2ApiService.getItem(oid);
    item.set(response);
    return response;
  };

  const createItem = async (data: ItemsTag): Promise<ItemsTag> => {
    const response = await _itemsTagsV2ApiService.createItem(data);
    item.set(response);
    return response;
  };

  const updateItem = async (data: ItemsTag): Promise<ItemsTag> => {
    const response = await _itemsTagsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _itemsTagsV2ApiService.deleteItem(oid);
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
