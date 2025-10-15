import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { NotesLabelsDataService } from "./notes-labels-data.service";
import { NoteLabel } from "./notes-labels.model";
import { FirebaseAuthV2Service } from '../../../../core/auth-firebase/firebase-auth-v2.service';

export const NotesLabelsV2ApiService = createInjectable(() => {
  const _notesLabelsDataService = inject(NotesLabelsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();
  
  const getAll = async ():Promise<NoteLabel[]> => {
    const response$ = _notesLabelsDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<NoteLabel> => {
    const response$ = _notesLabelsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: NoteLabel):Promise<NoteLabel> => {
    data.orgId = loginUser.orgId;
    const response$ = _notesLabelsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: NoteLabel):Promise<NoteLabel> => {
    const response$ = _notesLabelsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _notesLabelsDataService.deleteItem(id);
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
