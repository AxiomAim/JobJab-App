import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { NoteLabel } from "./notes-labels.model";
import { NotesLabelsV2ApiService } from "./notes-labels-v2-api.service";

export const NotesLabelsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _notesLabelsV2ApiService = inject(NotesLabelsV2ApiService);
  const allNotesLabels = signal<NoteLabel[] | null>(null);
  const notesLabels = signal<NoteLabel[] | null>(null);
  const notesLabel = signal<NoteLabel | null>(null);
  const loginUser = signal<NoteLabel | null>(null);

  const getAll = async ():Promise<NoteLabel[]> => {
    const response = await _notesLabelsV2ApiService.getAll();
    allNotesLabels.set(response);
    notesLabels.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<NoteLabel> => {
    const response = await _notesLabelsV2ApiService.getItem(oid);
    notesLabel.set(response);
    return response;
  };

  const createItem = async (data: NoteLabel): Promise<NoteLabel> => {
    const response = await _notesLabelsV2ApiService.createItem(data);
    notesLabel.set(response);
    return response;
  };

  const updateItem = async (data: NoteLabel): Promise<NoteLabel> => {
    const response = await _notesLabelsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _notesLabelsV2ApiService.deleteItem(oid);
    notesLabel.set(null);
    return response;
  };

  const setNote = async (thisNote: NoteLabel): Promise<NoteLabel> => {
    notesLabel.set(thisNote);
    return notesLabel();
  };
  

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allNotesLabels().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
      notesLabels.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

  return {
    notes: computed(() => notesLabels()),
    allNotes: computed(() => allNotesLabels()),
    note: computed(() => notesLabel()),
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
