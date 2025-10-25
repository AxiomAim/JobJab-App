import { createInjectable } from 'ngxtension/create-injectable';
import { Storage } from '@capacitor/storage';
import { HttpClient, HttpContext } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

const APP_DOMAIN = "appDomain";
const USERNAME = "usename";
const PASSWORD = "password";
const VIEW_TABLE = "viewTable";
const VIEW_BACKLOG = "viewBacklog";

export const LocalV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _httpClient = inject(HttpClient);
  const appDomain = signal<any | null>(null);
  const username = signal<any | null>(null);
  const password = signal<any | null>(null);
  const viewTable = signal<boolean | null>(false);
  const viewBacklog = signal<boolean | null>(false);

  const loading = signal(false);
  const error = signal<string | null>(null);


  const setAppdomain = (data: any) => {
    appDomain.set(data)
    setToStorage();
  }

  const setUsername = (data: any) => {
    username.set(data)
    setToStorage();
  }

  const setPassword = (data: any) => {
    password.set(data)
    setToStorage();
  }

  const setViewTable = (data: any) => {
    viewTable.set(data)
    setToStorage();
  }

  const setViewBacklog = (data: any) => {
    viewBacklog.set(data)
    setToStorage();
  }


  const loadFromStorage = async () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonDomain = await Storage.get({ key: APP_DOMAIN });
      appDomain.set(jsonDomain.value ? JSON.parse(jsonDomain.value) : null)
      const jsonUsername = await Storage.get({ key: USERNAME });
      username.set(jsonUsername.value ? JSON.parse(jsonUsername.value) : null)
      const jsonPassword = await Storage.get({ key: PASSWORD });
      password.set(jsonPassword.value ? JSON.parse(jsonPassword.value) : null)
      const jsonViewTable = await Storage.get({ key: VIEW_TABLE });
      viewTable.set(jsonViewTable.value ? JSON.parse(jsonViewTable.value) : null)
      const jsonViewBacklog = await Storage.get({ key: VIEW_BACKLOG });
      viewBacklog.set(jsonViewBacklog.value ? JSON.parse(jsonViewBacklog.value) : null)

    } catch(err) {
      error.set(err)
      console.error('Error loading user from storage:', err);
    }
    loading.set(false);

  }

  const setToStorage = async () => {
    loading.set(true);
    error.set(null);  
    try {
      await Storage.set({key: APP_DOMAIN, value: JSON.stringify(appDomain()),});
      await Storage.set({key: USERNAME, value: JSON.stringify(username()),});
      await Storage.set({key: PASSWORD, value: JSON.stringify(password()),});
      await Storage.set({key: VIEW_TABLE, value: JSON.stringify(viewTable()),});
      await Storage.set({key: VIEW_BACKLOG, value: JSON.stringify(viewBacklog()),});
    } catch(err) {
      error.set(err)
      console.error('Error setting user to storage:', err);
    }
    loading.set(false);

  }

  const removeFromStorage = async () => {
    loading.set(true);
    error.set(null);  
    try {
      await Storage.remove({ key: APP_DOMAIN });
      await Storage.remove({ key: USERNAME });
      await Storage.remove({ key: PASSWORD });
      await Storage.remove({ key: VIEW_TABLE });
      await Storage.remove({ key: VIEW_BACKLOG });
    } catch(err) {
      error.set(err)
      console.error('Error removing user from storage:', err);
    }
    loading.set(false);
  }



  return {
    appDomain: computed(() => appDomain()),
    userbame: computed(() => username()),
    password: computed(() => password()),
    viewTable: computed(() => viewTable()),
    viewBacklog: computed(() => viewBacklog()),
    loadFromStorage,
    setToStorage,
    removeFromStorage,
    setAppdomain,
    setUsername,
    setPassword,
    setViewTable,
    setViewBacklog
  };


});


