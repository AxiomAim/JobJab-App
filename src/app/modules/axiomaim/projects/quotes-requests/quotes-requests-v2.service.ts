import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { QuotesRequestsV2ApiService } from "./quotes-requests-v2-api.service";
import { QuotesRequest } from "./quotes-requests.model";

export const QuotesRequestsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _quotesV2ApiService = inject(QuotesRequestsV2ApiService);
  const allQuotesRequests = signal<QuotesRequest[] | null>(null);
  const quotesRequests = signal<QuotesRequest[] | null>(null);
  const quoteRequest = signal<QuotesRequest | null>(null);

  const getAll = async ():Promise<QuotesRequest[]> => {
    const response = await _quotesV2ApiService.getAll();
    allQuotesRequests.set(response);
    quotesRequests.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<QuotesRequest> => {
    const response = await _quotesV2ApiService.getItem(oid);
    quoteRequest.set(response);
    return response;
  };

  const createItem = async (data: QuotesRequest): Promise<QuotesRequest> => {
    const response = await _quotesV2ApiService.createItem(data);
    quoteRequest.set(response);
    return response;
  };

  const updateItem = async (data: QuotesRequest): Promise<QuotesRequest> => {
    const response = await _quotesV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _quotesV2ApiService.deleteItem(oid);
    quoteRequest.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allQuotesRequests().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      quotesRequests.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    quotesRequests: computed(() => quotesRequests()),
    allQuotesRequests: computed(() => allQuotesRequests()),
    quoteRequest: computed(() => quoteRequest()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
