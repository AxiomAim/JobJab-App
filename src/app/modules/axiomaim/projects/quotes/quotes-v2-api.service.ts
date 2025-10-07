import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { QuotesDataService } from "./quotes-data.service";
import { Quote } from "./quotes.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const QuotesV2ApiService = createInjectable(() => {
  const _quotesDataService = inject(QuotesDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();

  const getAll = async ():Promise<Quote[]> => {
    const response$ = _quotesDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Quote> => {
    const response$ = _quotesDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Quote):Promise<Quote> => {
    data.orgId = loginUser.orgId;
    const response$ = _quotesDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Quote):Promise<Quote> => {
    const response$ = _quotesDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _quotesDataService.deleteItem(id);
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
