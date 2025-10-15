import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { NotesV2ApiService } from "./notes-v2-api.service";
import { Note } from "./notes.model";

export const NotesV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _usersV2ApiService = inject(NotesV2ApiService);
  const allNotes = signal<Note[] | null>(null);
  const notes = signal<Note[] | null>(null);
  const note = signal<Note | null>(null);
  const loginUser = signal<Note | null>(null);

  const getAll = async ():Promise<Note[]> => {
    const response = await _usersV2ApiService.getAll();
    allNotes.set(response);
    notes.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Note> => {
    const response = await _usersV2ApiService.getItem(oid);
    note.set(response);
    return response;
  };

  const createItem = async (data: Note): Promise<Note> => {
    const response = await _usersV2ApiService.createItem(data);
    note.set(response);
    return response;
  };

  const updateItem = async (data: Note): Promise<Note> => {
    const response = await _usersV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _usersV2ApiService.deleteItem(oid);
    note.set(null);
    return response;
  };

  const setNote = async (thisNote: Note): Promise<Note> => {
    note.set(thisNote);
    return note();
  };
  

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allNotes().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      notes.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    notes: computed(() => notes()),
    allNotes: computed(() => allNotes()),
    note: computed(() => note()),
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
