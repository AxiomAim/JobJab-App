import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { InvoicesV2ApiService } from "./invoices-v2-api.service";
import { Invoice } from "./invoices.model";

const ALL_INVOICES = "allInvoices";
const INVOICES = "invoices";
const INVOICE = "invoice";


export const InvoicesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _invoicesV2ApiService = inject(InvoicesV2ApiService);
  const allInvoices = signal<Invoice[] | null>(null);
  const invoices = signal<Invoice[] | null>(null);
  const invoice = signal<Invoice | null>(null);

  const getAll = async ():Promise<Invoice[]> => {
    const response = await _invoicesV2ApiService.getAll();
    allInvoices.set(response);
    invoices.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Invoice> => {
    const response = await _invoicesV2ApiService.getItem(oid);
    invoice.set(response);
    return response;
  };

  const createItem = async (data: Invoice): Promise<Invoice> => {
    const response = await _invoicesV2ApiService.createItem(data);
    invoice.set(response);
    return response;
  };

  const updateItem = async (data: Invoice): Promise<Invoice> => {
    const response = await _invoicesV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _invoicesV2ApiService.deleteItem(oid);
    invoice.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allInvoices().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      invoices.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    invoices: computed(() => invoices()),
    allInvoices: computed(() => allInvoices()),
    invoice: computed(() => invoice()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
  };
});
