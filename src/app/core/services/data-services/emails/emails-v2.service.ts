import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Email } from "./emails.model";
import { EmailsApiV2Service } from "./emails-v2-api.service";

export const EmailsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _emailsApiV2Service = inject(EmailsApiV2Service);
  const allEmails = signal<Email[] | null>(null);
  const emails = signal<Email[] | null>(null);
  const email = signal<Email | null>(null);

  
  const getAll = async ():Promise<Email[]> => {
    const response = await _emailsApiV2Service.getAll();
    allEmails.set(response);
    emails.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Email> => {
    const response = await _emailsApiV2Service.getItem(oid);
    email.set(response);
    return response;
  };

  const createItem = async (data: Email): Promise<Email> => {
    const response = await _emailsApiV2Service.createItem(data);
    email.set(response);
    return response;
  };

  const updateItem = async (data: Email): Promise<Email> => {
    const response = await _emailsApiV2Service.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _emailsApiV2Service.deleteItem(oid);
    email.set(null);
    return response;
  };

  const setContact = async (thisContact: Email): Promise<Email> => {
    email.set(thisContact);
    return email();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allEmails().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      emails.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

    
  return {
    emails: computed(() => emails()),
    allEmails: computed(() => allEmails()),
    email: computed(() => email()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
  };
});
