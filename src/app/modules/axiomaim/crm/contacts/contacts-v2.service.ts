import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ContactsV2ApiService } from "./contacts-v2-api.service";
import { Country, Contact } from "./contacts.model";
import { firstValueFrom, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { PhoneLabel } from "app/core/models/phone-labels.model";
import { EmailLabel } from "app/core/models/email-labels.model";

export const ContactsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _customersV2ApiService = inject(ContactsV2ApiService);
  const allContacts = signal<Contact[] | null>(null);
  const contacts = signal<Contact[] | null>(null);
  const contact = signal<Contact | null>(null);
  const countries = signal<Country | null>(null);

  
  const getAll = async ():Promise<Contact[]> => {
    const response = await _customersV2ApiService.getAll();
    allContacts.set(response);
    contacts.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Contact> => {
    const response = await _customersV2ApiService.getItem(oid);
    contact.set(response);
    return response;
  };

  const createItem = async (data: Contact): Promise<Contact> => {
    const response = await _customersV2ApiService.createItem(data);
    contact.set(response);
    return response;
  };

  const updateItem = async (data: Contact): Promise<Contact> => {
    const response = await _customersV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _customersV2ApiService.deleteItem(oid);
    contact.set(null);
    return response;
  };

  const setContact = async (thisContact: Contact): Promise<Contact> => {
    contact.set(thisContact);
    return contact();
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
      contacts.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  /**
   * Get countries
   */
  const getCountries = async (): Promise<Country[]> => {
    const allCountries = _httpClient
        .get<Country[]>('api/apps/contacts/countries')
        .pipe(
            tap((countries) => {
              return countries
            })
        );
    return await firstValueFrom(allCountries)        
  }

    /**
     * Get emailLabels
     */
    const getEmailLabels = async (): Promise<EmailLabel[]> => {
      const allPhoneLabels = await _httpClient
          .get<PhoneLabel[]>('api/common/email-labels')
          .pipe(
              tap((emailLabelsRes: EmailLabel[]) => {
                console.log('emailLabelsRes', emailLabelsRes);
                return emailLabelsRes;
              })
          );
          return null;
      // return await firstValueFrom(allPhoneLabels)        
    }
  
    /**
     * Get phoneLabels
     */
    const getPhoneLabels = async (): Promise<PhoneLabel[]> => {
      const allPhoneLabels = await _httpClient
          .get<PhoneLabel[]>('api/common/phone-labels')
          .pipe(
              tap((phoneLabelsRes: PhoneLabel[]) => {
                return phoneLabelsRes;
              })
          );
          return null;
      // return await firstValueFrom(allPhoneLabels)        
    }

    
  return {
    contacts: computed(() => contacts()),
    allContacts: computed(() => allContacts()),
    contact: computed(() => contact()),
    countries: computed(() => countries()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
    getCountries,
    getEmailLabels,
    getPhoneLabels
  };
});
