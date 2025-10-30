import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { JobsV2ApiService } from "./jobs-v2-api.service";
import { Job } from "./jobs.model";
import { HttpClient } from "@angular/common/http";
import { JobBoardList } from "app/core/models/job-board-list.model";
import { firstValueFrom, tap } from "rxjs";

export const JobsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _customersV2ApiService = inject(JobsV2ApiService);
  const allJobs = signal<Job[] | null>(null);
  const jobs = signal<Job[] | null>(null);
  const job = signal<Job | null>(null);
  const jobBoardList = signal<JobBoardList[] | null>(null);

  const getAll = async ():Promise<Job[]> => {
    const response = await _customersV2ApiService.getAll();
    allJobs.set(response);
    jobs.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Job> => {
    const response = await _customersV2ApiService.getItem(oid);
    job.set(response);
    return response;
  };

  const createItem = async (data: Job): Promise<Job> => {
    const response = await _customersV2ApiService.createItem(data);
    job.set(response);
    return response;
  };

  const updateItem = async (data: Job): Promise<Job> => {
    const response = await _customersV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _customersV2ApiService.deleteItem(oid);
    job.set(null);
    return response;
  };

  const setContact = async (thisContact: Job): Promise<Job> => {
    job.set(thisContact);
    return job();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allJobs().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      jobs.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

    /**
     * Get jobboardList
     */
    const getJobBoardList = async (): Promise<JobBoardList[]> => {
      const allPhoneLabels = await _httpClient
          .get<JobBoardList[]>('api/common/job-board-list')
          .pipe(
              tap((jobBoardListRes: JobBoardList[]) => {
                jobBoardList.set(jobBoardListRes);
                return jobBoardListRes;
              })
          );
          // return null;
      return await firstValueFrom(allPhoneLabels)        
    }
  
  
    
  return {
    jobs: computed(() => jobs()),
    allJobs: computed(() => allJobs()),
    job: computed(() => job()),
    jobBoardList: computed(() => jobBoardList()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
    getJobBoardList
  };
});
