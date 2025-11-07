import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { FormsDataService } from "./forms-data.service";
import { Form } from "./forms.model";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const FormsV2ApiService = createInjectable(() => {
  const _formsDataService = inject(FormsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();
  
  const getAll = async ():Promise<Form[]> => {
    const response$ = _formsDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<Form> => {
    const response$ = _formsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: Form):Promise<Form> => {
    data.orgId = loginUser.orgId;
    const response$ = _formsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: Form):Promise<Form> => {
    const response$ = _formsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _formsDataService.deleteItem(id);
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
