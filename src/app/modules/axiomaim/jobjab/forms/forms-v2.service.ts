import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { FormsV2ApiService } from "./forms-v2-api.service";
import { Form } from "./forms.model";
import { HttpClient } from "@angular/common/http";

export const FormsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _customersV2ApiService = inject(FormsV2ApiService);
  const allForms = signal<Form[] | null>(null);
  const forms = signal<Form[] | null>(null);
  const form = signal<Form | null>(null);

  const getAll = async ():Promise<Form[]> => {
    const response = await _customersV2ApiService.getAll();
    allForms.set(response);
    forms.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Form> => {
    const response = await _customersV2ApiService.getItem(oid);
    form.set(response);
    return response;
  };

  const createItem = async (data: Form): Promise<Form> => {
    const response = await _customersV2ApiService.createItem(data);
    form.set(response);
    return response;
  };

  const updateItem = async (data: Form): Promise<Form> => {
    const response = await _customersV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _customersV2ApiService.deleteItem(oid);
    form.set(null);
    return response;
  };

  const setContact = async (thisContact: Form): Promise<Form> => {
    form.set(thisContact);
    return form();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allForms().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      forms.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };
  
  
    
  return {
    forms: computed(() => forms()),
    allForms: computed(() => allForms()),
    form: computed(() => form()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
  };
});
