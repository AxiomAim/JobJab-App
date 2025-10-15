import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { TasksV2ApiService } from "./tasks-v2-api.service";
import { Tag, Task } from "./tasks.model";
import { firstValueFrom, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

export const TasksV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _tasksV2ApiService = inject(TasksV2ApiService);
  const allTasks = signal<Task[] | null>(null);
  const tasks = signal<Task[] | null>(null);
  const task = signal<Task | null>(null);
  const tags = signal<Tag[] | []>([]);

  
  const getAll = async ():Promise<Task[]> => {
    const response = await _tasksV2ApiService.getAll();
    allTasks.set(response);
    tasks.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Task> => {
    const response = await _tasksV2ApiService.getItem(oid);
    task.set(response);
    tags.set(response.tags);
    return response;
  };

  const createItem = async (data: Task): Promise<Task> => {
    const response = await _tasksV2ApiService.createItem(data);
    task.set(response);
    return response;
  };

  const updateItem = async (data: Task): Promise<Task> => {
    const response = await _tasksV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _tasksV2ApiService.deleteItem(oid);
    task.set(null);
    return response;
  };

  const setContact = async (thisContact: Task): Promise<Task> => {
    task.set(thisContact);
    return task();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allTasks().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      tasks.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  
  return {
    tasks: computed(() => tasks()),
    allTasks: computed(() => allTasks()),
    task: computed(() => task()),
    tags: computed(() => tags()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
  };
});
