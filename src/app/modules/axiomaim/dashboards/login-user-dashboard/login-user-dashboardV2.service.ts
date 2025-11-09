import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, firstValueFrom, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ContactsV2Service } from "../../crm/contacts/contacts-v2.service";
import { Contact } from "../../crm/contacts/contacts.model";
import { QueriesV2Service } from "../../jobjab/queries/queries-v2.service";
import { Query } from "../../jobjab/queries/queries.model";
import { Quote } from "../../projects/quotes/quotes.model";
import { Job } from "../../jobjab/jobs/jobs.model";
import { Invoice } from "../../administration/invoices/invoices.model";
import { JobsV2Service } from "../../jobjab/jobs/jobs-v2.service";
import { InvoicesV2Service } from "../../administration/invoices/invoices-v2.service";
import { QuotesV2Service } from "../../projects/quotes/quotes-v2.service";

export const LoginUserDashboardV2Service = createInjectable(() => {
  const _data: BehaviorSubject<any> = new BehaviorSubject(null);
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _queriesV2Service = inject(QueriesV2Service);
  const _quotesV2Service = inject(QuotesV2Service);
  const _jobsV2Service = inject(JobsV2Service);
  const _invoicesV2Service = inject(InvoicesV2Service);
  const _contactsV2Service = inject(ContactsV2Service);
  const queries = signal<Query[] | null>(null);
  const quotes = signal<Quote[] | null>(null);
  const jobs = signal<Job[] | null>(null);
  const invoices = signal<Invoice[] | null>(null);
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

const getQueries = async (): Promise<Query[]> => {
  const response = await _queriesV2Service.getAll();
  queries.set(response);
  return queries();
};

const getQuotes = async (): Promise<Quote[]> => {
  const response = await _quotesV2Service.getAll();
  quotes.set(response);
  return quotes();
};

const getJobs = async (): Promise<Job[]> => {
  const response = await _jobsV2Service.getAll();
  jobs.set(response);
  return jobs();
};

const getInvoices = async (): Promise<Invoice[]> => {
  const response = await _invoicesV2Service.getAll();
  invoices.set(response);
  return invoices();
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
    queries: computed(() => queries()),
    quotes: computed(() => quotes()),
    jobs: computed(() => jobs()),
    invoices: computed(() => invoices()),
    totalLeads: computed(() => totalLeads()),
    newLeads: computed(() => newLeads()),
    data: computed(() => data()),
    getTotalLeads,
    getData,
    getQueries,
    getQuotes,
    getJobs,
    getInvoices,
    getItem,
    // search,
  };
});
