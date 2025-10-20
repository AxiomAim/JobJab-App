import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ItemsCategoriesV2ApiService } from "./items-categories-v2-api.service";
import { ItemsCategory } from "./items-categories.model";

export const ItemsCategoriesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _itemsCategoriesV2ApiService = inject(ItemsCategoriesV2ApiService);
  const allItems = signal<ItemsCategory[] | null>(null);
  const items = signal<ItemsCategory[] | null>(null);
  const item = signal<ItemsCategory | null>(null);

  const getAll = async ():Promise<ItemsCategory[]> => {
    const response = await _itemsCategoriesV2ApiService.getAll();
    allItems.set(response);
    items.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<ItemsCategory> => {
    const response = await _itemsCategoriesV2ApiService.getItem(oid);
    item.set(response);
    return response;
  };

  const createItem = async (data: ItemsCategory): Promise<ItemsCategory> => {
    const response = await _itemsCategoriesV2ApiService.createItem(data);
    item.set(response);
    return response;
  };

  const updateItem = async (data: ItemsCategory): Promise<ItemsCategory> => {
    const response = await _itemsCategoriesV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _itemsCategoriesV2ApiService.deleteItem(oid);
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
