import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { SubscriptionsV2ApiService } from "./subscriptions-v2-api.service";
import { Subscription } from "./subscriptions.model";


export const SubscriptionsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _subscriptionsV2ApiService = inject(SubscriptionsV2ApiService);
  const allSubscriptions = signal<Subscription[] | null>(null);
  const subscriptions = signal<Subscription[] | null>(null);
  const subscription = signal<Subscription | null>(null);

  const getAll = async ():Promise<Subscription[]> => {
    const response = await _subscriptionsV2ApiService.getAll();
    allSubscriptions.set(response);
    subscriptions.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Subscription> => {
    const response = await _subscriptionsV2ApiService.getItem(oid);
    subscription.set(response);
    return response;
  };

  const createItem = async (data: Subscription): Promise<Subscription> => {
    const response = await _subscriptionsV2ApiService.createItem(data);
    subscription.set(response);
    return response;
  };

  const updateItem = async (data: Subscription): Promise<Subscription> => {
    const response = await _subscriptionsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _subscriptionsV2ApiService.deleteItem(oid);
    subscription.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allSubscriptions().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      subscriptions.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    subscriptions: computed(() => subscriptions()),
    allSubscriptions: computed(() => allSubscriptions()),
    subscription: computed(() => subscription()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
