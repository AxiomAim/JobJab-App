import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { JobsDataService } from "./jobs-data.service";
import { Job } from "./jobs.model";

export const JobsV2ApiService = createInjectable(() => {
  const _jobsDataService = inject(JobsDataService);
  
  const getAll = async ():Promise<Job[]> => {
    const response$ = _jobsDataService.getAll();
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Job> => {
    const response$ = _jobsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Job):Promise<Job> => {
    const response$ = _jobsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Job):Promise<Job> => {
    const response$ = _jobsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _jobsDataService.deleteItem(id);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };


  return {
    getAll,
    createItem,
    updateItem,
    deleteItem,
    getItem,
  };
});
