import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationsV2ApiService } from "./notifications-v2-api.service";
import { Notification } from "./notifications.model";

const ALL_NOTIFICATIONS = "allNotifications";
const NOTIFICATIONS = "notifications";
const NOTIFICATION = "notification";


export const NotificationsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _notificationsV2ApiService = inject(NotificationsV2ApiService);
  const allNotifications = signal<Notification[] | null>(null);
  const notifications = signal<Notification[] | null>(null);
  const notification = signal<Notification | null>(null);

  const getAll = async ():Promise<Notification[]> => {
    const response = await _notificationsV2ApiService.getAll();
    allNotifications.set(response);
    notifications.set(response);
    return response;
  };

  const getItem = async (oid: string): Promise<Notification> => {
    const response = await _notificationsV2ApiService.getItem(oid);
    notification.set(response);
    return response;
  };

  const createItem = async (data: Notification): Promise<Notification> => {
    const response = await _notificationsV2ApiService.createItem(data);
    notification.set(response);
    return response;
  };

  const updateItem = async (data: Notification): Promise<Notification> => {
    const response = await _notificationsV2ApiService.updateItem(data);
    return response;
  };

  const deleteItem = async (oid: string): Promise<any> => {
    const response = await _notificationsV2ApiService.deleteItem(oid);
    notification.set(null);
    return response;
  };

  const search = async (query: string): Promise<any[]> => {
    try {
      // const response: any = await _participantsV2ApiService.updateParticipantItem(data);
      let searchResults = allNotifications().filter(
        (searchResults: any) =>
          searchResults.name &&
        searchResults.name.toLowerCase().includes(query.toLowerCase())
      );
      searchResults.sort((a: any, b: any) => a.name.localeCompare(b.name));
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
  };
});
