import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { MessagesV2ApiService } from "./messages-v2-api.service";
import { Message } from "./messages.model";
import { firstValueFrom, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

export const MessagesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _customersV2ApiService = inject(MessagesV2ApiService);
  const allContacts = signal<Message[] | null>(null);
  const messages = signal<Message[] | null>(null);
  const message = signal<Message | null>(null);
  
  const getAll = async ():Promise<Message[]> => {
    const response = await _customersV2ApiService.getAll();
    allContacts.set(response);
    messages.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Message> => {
    const response = await _customersV2ApiService.getItem(oid);
    message.set(response);
    return response;
  };

  const createItem = async (data: Message): Promise<Message> => {
    const response = await _customersV2ApiService.createItem(data);
    message.set(response);
    return response;
  };

  const updateItem = async (data: Message): Promise<Message> => {
    const response = await _customersV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _customersV2ApiService.deleteItem(oid);
    message.set(null);
    return response;
  };

  const setContact = async (thisContact: Message): Promise<Message> => {
    message.set(thisContact);
    return message();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allContacts().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      messages.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };
  
  return {
    messages: computed(() => messages()),
    allContacts: computed(() => allContacts()),
    message: computed(() => message()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
  };
});
