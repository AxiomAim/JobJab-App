import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { LeadsV2Service } from "../../crm/leads/leads-v2.service";
import { Lead } from "../../crm/leads/leads.model";

export const CRMV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _leadsV2Service = inject(LeadsV2Service);
  const totalLeads = signal<Lead[] | null>(null);
  const newLeads = signal<Lead[] | null>(null);
  const leads = signal<Lead[] | null>(null);
  const lead = signal<Lead | null>(null);



const getTotalLeads = async (): Promise<Lead[]> => {
  const response = await _leadsV2Service.getAll();
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

  const getItem = async (oid: string): Promise<Lead> => {
    const response = await _leadsV2Service.getItem(oid);
    lead.set(response);
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
    getTotalLeads,
    // search,
  };
});
