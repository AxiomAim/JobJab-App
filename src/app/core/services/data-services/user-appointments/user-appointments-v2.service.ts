import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserAppointment } from "app/core/services/data-services/user-appointments/user-appointment.model";
import { UserAppointmentsApiV2Service } from "./user-appointments-v2-api.service";

export const UserAppointmentsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _userAppointmentsApiV2Service = inject(UserAppointmentsApiV2Service);
  const allUserAppointments = signal<UserAppointment[] | null>(null);
  const userAppointments = signal<UserAppointment[] | null>(null);
  const userAppointment = signal<UserAppointment | null>(null);

  
  const getAll = async ():Promise<UserAppointment[]> => {
    const response = await _userAppointmentsApiV2Service.getAll();
    allUserAppointments.set(response);
    userAppointments.set(response);
    return response;
  };

  const getAllUserAppomitments = async ():Promise<UserAppointment[]> => {
    const response = await _userAppointmentsApiV2Service.getAll();
    allUserAppointments.set(response);
    userAppointments.set(response);
    return response;
  };


  const getItem = async (oid: string): Promise<UserAppointment> => {
    const response = await _userAppointmentsApiV2Service.getItem(oid);
    userAppointment.set(response);
    return response;
  };

  const createItem = async (data: UserAppointment): Promise<UserAppointment> => {
    const response = await _userAppointmentsApiV2Service.createItem(data);
    userAppointment.set(response);
    return response;
  };

  const updateItem = async (data: UserAppointment): Promise<UserAppointment> => {
    const response = await _userAppointmentsApiV2Service.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _userAppointmentsApiV2Service.deleteItem(oid);
    userAppointment.set(null);
    return response;
  };

  const setContact = async (thisContact: UserAppointment): Promise<UserAppointment> => {
    userAppointment.set(thisContact);
    return userAppointment();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allUserAppointments().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      userAppointments.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

    
  return {
    userAppointments: computed(() => userAppointments()),
    allUserAppointments: computed(() => allUserAppointments()),
    userAppointment: computed(() => userAppointment()),
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
