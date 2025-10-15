import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { NoteTask } from "./notes-tasks.model";
import { FirebaseAuthV2Service } from '../../../../core/auth-firebase/firebase-auth-v2.service';
import { NotesTasksDataService } from "./notes-tasks-data.service";

export const NotesTasksV2ApiService = createInjectable(() => {
  const _notesTasksDataService = inject(NotesTasksDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();
  
  const getAll = async ():Promise<NoteTask[]> => {
    const response$ = _notesTasksDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<NoteTask> => {
    const response$ = _notesTasksDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: NoteTask):Promise<NoteTask> => {
    data.orgId = loginUser.orgId;
    const response$ = _notesTasksDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: NoteTask):Promise<NoteTask> => {
    const response$ = _notesTasksDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _notesTasksDataService.deleteItem(id);
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
