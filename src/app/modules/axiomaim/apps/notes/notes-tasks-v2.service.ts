import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { NoteTask } from "./notes-tasks.model";
import { NotesTasksV2ApiService } from "./notes-tasks-v2-api.service";
import { User } from "../../administration/users/users.model";

export const NotesTasksV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _notesTasksV2ApiService = inject(NotesTasksV2ApiService);
  const allNotesTasks = signal<NoteTask[] | null>(null);
  const notesTasks = signal<NoteTask[] | null>(null);
  const notesTask = signal<NoteTask | null>(null);
  const loginUser = signal<User | null>(null);

  const getAll = async ():Promise<NoteTask[]> => {
    const response = await _notesTasksV2ApiService.getAll();
    allNotesTasks.set(response);
    notesTasks.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<NoteTask> => {
    const response = await _notesTasksV2ApiService.getItem(oid);
    notesTask.set(response);
    return response;
  };

  const createItem = async (data: NoteTask): Promise<NoteTask> => {
    const response = await _notesTasksV2ApiService.createItem(data);
    notesTask.set(response);
    return response;
  };

  const updateItem = async (data: NoteTask): Promise<NoteTask> => {
    const response = await _notesTasksV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _notesTasksV2ApiService.deleteItem(oid);
    notesTask.set(null);
    return response;
  };

  const setNote = async (thisNote: NoteTask): Promise<NoteTask> => {
    notesTask.set(thisNote);
    return notesTask();
  };
  

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allNotesTasks().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      notesTasks.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    notesTasks: computed(() => notesTasks()),
    allNotesTasks: computed(() => allNotesTasks()),
    notesTask: computed(() => notesTask()),
    loginUser: computed(() => loginUser()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setNote
  };
});
