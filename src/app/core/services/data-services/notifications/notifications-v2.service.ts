import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Notification } from "./notifications.model";
import { NotificationsApiV2Service } from "./notifications-v2-api.service";

export const NotificationsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const _notificationsApiV2Service = inject(NotificationsApiV2Service);
  const allNotifications = signal<Notification[] | null>(null);
  const notifications = signal<Notification[] | null>(null);
  const notification = signal<Notification | null>(null);

  
  const getAll = async ():Promise<Notification[]> => {
    const response = await _notificationsApiV2Service.getAll();
    allNotifications.set(response);
    notifications.set(response);
    return response;
  };

  const getAllUserAppomitments = async ():Promise<Notification[]> => {
    const response = await _notificationsApiV2Service.getAll();
    allNotifications.set(response);
    notifications.set(response);
    return response;
  };


  const getItem = async (oid: string): Promise<Notification> => {
    const response = await _notificationsApiV2Service.getItem(oid);
    notification.set(response);
    return response;
  };

  const createItem = async (data: Notification): Promise<Notification> => {
    const response = await _notificationsApiV2Service.createItem(data);
    notification.set(response);
    return response;
  };

  const updateItem = async (data: Notification): Promise<Notification> => {
    const response = await _notificationsApiV2Service.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _notificationsApiV2Service.deleteItem(oid);
    notification.set(null);
    return response;
  };

  const setContact = async (thisContact: Notification): Promise<Notification> => {
    notification.set(thisContact);
    return notification();
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allNotifications().filter(
        (searchResults: any) =>
          searchResults.displayName &&
        searchResults.displayName.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.displayName.localeCompare(b.displayName));
      notifications.set(searchResults);
      return searchResults;
    }
    catch (error) {
      console.error("Error in search:", error);
      throw error;
    }
  };

    
  return {
    notifications: computed(() => notifications()),
    allNotifications: computed(() => allNotifications()),
    notification: computed(() => notification()),
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
