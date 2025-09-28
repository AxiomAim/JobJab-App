import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { QuotesV2ApiService } from "./quotes-v2-api.service";
import { Quote } from "./quotes.model";

const ALL_QUOTES = "allQuotes";
const QUOTES = "quotes";
const QUOTE = "quote";


export const QuotesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _quotesV2ApiService = inject(QuotesV2ApiService);
  const allQuotes = signal<Quote[] | null>(null);
  const quotes = signal<Quote[] | null>(null);
  const quote = signal<Quote | null>(null);

  const getAll = async ():Promise<Quote[]> => {
    const response = await _quotesV2ApiService.getAll();
    allQuotes.set(response);
    quotes.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Quote> => {
    const response = await _quotesV2ApiService.getItem(oid);
    quote.set(response);
    return response;
  };

  const createItem = async (data: Quote): Promise<Quote> => {
    const response = await _quotesV2ApiService.createItem(data);
    quote.set(response);
    return response;
  };

  const updateItem = async (data: Quote): Promise<Quote> => {
    const response = await _quotesV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _quotesV2ApiService.deleteItem(oid);
    quote.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allQuotes().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      quotes.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    quotes: computed(() => quotes()),
    allQuotes: computed(() => allQuotes()),
    quote: computed(() => quote()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
