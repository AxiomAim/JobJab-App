import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, firstValueFrom, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { QuotesV2Service } from "app/modules/axiomaim/projects/quotes/quotes-v2.service";
import { JobsV2Service } from "app/modules/axiomaim/jobjab/jobs/jobs-v2.service";
import { InvoicesV2Service } from "app/modules/axiomaim/administration/invoices/invoices-v2.service";
import { Quote } from "app/modules/axiomaim/projects/quotes/quotes.model";
import { Job } from "app/modules/axiomaim/jobjab/jobs/jobs.model";
import { Invoice } from "app/modules/axiomaim/administration/invoices/invoices.model";
import { Request } from "app/core/services/data-services/requests/requests.model";
import { QueriesV2Service } from "app/modules/axiomaim/jobjab/queries/queries-v2.service";
import { Query } from "app/modules/axiomaim/jobjab/queries/queries.model";

export const CrmV2Service = createInjectable(() => {
  const _data: BehaviorSubject<any> = new BehaviorSubject(null);
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _queriesV2Service = inject(QueriesV2Service);
  const _quotesV2Service = inject(QuotesV2Service);
  const _jobsV2Service = inject(JobsV2Service);
  const _invoicesV2Service = inject(InvoicesV2Service);
  const queries = signal<Query[] | null>(null);
  const quotes = signal<Quote[] | null>(null);
  const jobs = signal<Job[] | null>(null);
  const invoices = signal<Invoice[] | null>(null);
  const allRequests = signal<Request[] | null>(null);
  const allQuotes = signal<Quote[] | null>(null);
  const allJobs = signal<Job[] | null>(null);
  const allInvoices = signal<Invoice[] | null>(null);

const getAll = async (): Promise<any> => {
  const getQueries = await _queriesV2Service.getAll();
  const getQuotes = await _quotesV2Service.getAll();
  const getJobs = await _jobsV2Service.getAll();
  const getInvoices = await _invoicesV2Service.getAll();
  queries.set(getQueries);
  quotes.set(getQuotes);
  jobs.set(getJobs);
  invoices.set(getInvoices);
  // const newLeadsList = response.filter(lead => {
  //   const createdDate = new Date(lead.createdAt);
  //   const currentDate = new Date();
  //   const timeDiff = currentDate.getTime() - createdDate.getTime();
  //   const daysDiff = timeDiff / (1000 * 3600 * 24);
    
  //   return daysDiff <= 7; // Adjust the number of days as needed
  // });
  return;
};


  // const getItem = async (oid: string): Promise<Contact> => {
  //   const response = await _contactsV2Service.getItem(oid);
  //   lead.set(response);
  //   return response;
  // };

  // const getData = async ():Promise<any> => {
  //   const response$ = _httpClient.get('api/dashboards/analytics').pipe(
  //     tap((response: any) => {
  //         _data.next(response);
  //     }));
  //   const response = await firstValueFrom(response$)
  //   return response;
  // };
  


  
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
    // allRequests: computed(() => allRequests()),
    // allQuotes: computed(() => allQuotes()),
    // allJobs: computed(() => allJobs()),
    // allInvoices: computed(() => allInvoices()),
    getAll,

  };
});
