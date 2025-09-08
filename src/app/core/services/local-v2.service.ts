import { createInjectable } from 'ngxtension/create-injectable';
import { EncryptStorage } from 'encrypt-storage';
import { HttpClient, HttpContext } from '@angular/common/http';
import { signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});


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


  const loadFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      const jsonDomain = encryptStorage.getItem(APP_DOMAIN);
      appDomain.set(jsonDomain)
      const jsonUsername = encryptStorage.getItem(USERNAME);
      username.set(jsonUsername)
      const jsonPassword = encryptStorage.getItem(PASSWORD);
      password.set(jsonPassword)
      const jsonViewTable = encryptStorage.getItem(VIEW_TABLE);
      viewTable.set(jsonViewTable)
      const jsonViewBacklog = encryptStorage.getItem(VIEW_BACKLOG);
      viewBacklog.set(jsonViewBacklog)

    } catch(err) {
      error.set(err)
      console.error('Error loading user from storage:', err);
    }
    loading.set(false);

  }

  const setToStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      encryptStorage.setItem(APP_DOMAIN, JSON.stringify(appDomain()));
      encryptStorage.setItem(USERNAME, JSON.stringify(username()));
      encryptStorage.setItem(PASSWORD, JSON.stringify(password()));
      encryptStorage.setItem(VIEW_TABLE, JSON.stringify(viewTable()));
      encryptStorage.setItem(VIEW_BACKLOG, JSON.stringify(viewBacklog()));
    } catch(err) {
      error.set(err)
      console.error('Error setting user to storage:', err);
    }
    loading.set(false);

  }

  const removeFromStorage = () => {
    loading.set(true);
    error.set(null);  
    try {
      encryptStorage.removeItem(APP_DOMAIN);
      encryptStorage.removeItem(USERNAME);
      encryptStorage.removeItem(PASSWORD);
      encryptStorage.removeItem(VIEW_TABLE);
      encryptStorage.removeItem(VIEW_BACKLOG);
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


