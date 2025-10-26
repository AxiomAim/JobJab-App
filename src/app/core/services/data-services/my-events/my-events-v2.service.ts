import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserAppointment } from "app/core/services/data-services/user-appointments/user-appointment.model";
import { MyEvent } from "./my-events.model";
import { MyEventsApiV2Service } from "./my-events-v2-api.service";

export const MyEventsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _myEventsApiV2Service = inject(MyEventsApiV2Service);
  const allMyEvents = signal<MyEvent[] | null>(null);
  const myEvents = signal<MyEvent[] | null>(null);
  const myEvent = signal<MyEvent | null>(null);

  
  const getAll = async ():Promise<MyEvent[]> => {
    const response = await _myEventsApiV2Service.getAll();
    allMyEvents.set(response);
    myEvents.set(response);
    return response;
  };

  const getAllUserAppomitments = async ():Promise<UserAppointment[]> => {
    const response = await _myEventsApiV2Service.getAll();
    allMyEvents.set(response);
    myEvents.set(response);
    return response;
  };


  const getItem = async (oid: string): Promise<UserAppointment> => {
    const response = await _myEventsApiV2Service.getItem(oid);
    myEvent.set(response);
    return response;
  };

  const createItem = async (data: UserAppointment): Promise<UserAppointment> => {
    const response = await _myEventsApiV2Service.createItem(data);
    myEvent.set(response);
    return response;
  };

  const updateItem = async (data: UserAppointment): Promise<UserAppointment> => {
    const response = await _myEventsApiV2Service.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _myEventsApiV2Service.deleteItem(oid);
    myEvent.set(null);
    return response;
  };

  const setContact = async (thisContact: UserAppointment): Promise<UserAppointment> => {
    myEvent.set(thisContact);
    return myEvent();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allMyEvents().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      myEvents.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

    
  return {
    myEvents: computed(() => myEvents()),
    allMyEvents: computed(() => allMyEvents()),
    myEvent: computed(() => myEvent()),
    getAll,
    getItem,
    search,
    createItem,
    updateItem,
    deleteItem,
    setContact,
    getAllUserAppomitments
  };
});
