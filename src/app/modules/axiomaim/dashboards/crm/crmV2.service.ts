import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { LeadsV2Service } from "../../crm/leads/leads-v2.service";
import { Lead } from "../../crm/leads/leads.model";
import { BehaviorSubject, firstValueFrom, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ContactsV2Service } from "../../crm/contacts/contacts-v2.service";
import { Contact } from "../../crm/contacts/contacts.model";

export const CRMV2Service = createInjectable(() => {
  const _data: BehaviorSubject<any> = new BehaviorSubject(null);
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _contactsV2Service = inject(ContactsV2Service);
  const totalLeads = signal<Contact[] | null>(null);
  const newLeads = signal<Contact[] | null>(null);
  const leads = signal<Contact[] | null>(null);
  const lead = signal<Contact | null>(null);
  const data = signal<any[] | null>(null);

const getTotalLeads = async (): Promise<Contact[]> => {
  const response = await _contactsV2Service.getAll();
  totalLeads.set(response);
  const newLeadsList = response.filter(lead => {
    const createdDate = new Date(lead.createdAt);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - createdDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    
    return daysDiff <= 7; // Adjust the number of days as needed
  });
  newLeads.set(newLeadsList);
  leads.set(newLeadsList);
  return newLeadsList;
};

  const getItem = async (oid: string): Promise<Contact> => {
    const response = await _contactsV2Service.getItem(oid);
    lead.set(response);
    return response;
  };

  const getData = async ():Promise<any> => {
    const response$ = _httpClient.get('api/dashboards/analytics').pipe(
      tap((response: any) => {
          _data.next(response);
      }));
    const response = await firstValueFrom(response$)
    return response;
  };
  


  
//   const search = async (query: string): Promise<any[]> => {
//     try {
//       // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
//       let searchResults = allLeads().filter(
//         (searchResults: any) =>
//           searchResults.name &&
//         searchResults.name.toLowerCase().includes(query.toLowerCase())
//       );
//       searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
//       leads.set(searchResults);
//       return searchResults;
//     }
//     catch (error) {
//       console.error("Error in search:", error);
//       throw error;
//     }
//   };

  return {
    totalLeads: computed(() => totalLeads()),
    newLeads: computed(() => newLeads()),
    data: computed(() => data()),
    getTotalLeads,
    getData,
    // search,
  };
});
