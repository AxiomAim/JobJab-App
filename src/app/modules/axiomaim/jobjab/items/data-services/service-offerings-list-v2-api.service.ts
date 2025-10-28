import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ServiceOfferingsListDataService } from "./service-offerings-list-data.service";
import { ServiceOfferingList } from "./service-offerings-list.model";
import { 
  WhereFilterOp
} from '@angular/fire/firestore';
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";

export const ServiceOfferingsListV2ApiService = createInjectable(() => {
  const _serviceOfferingsListDataService = inject(ServiceOfferingsListDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();

  const getAll = async ():Promise<ServiceOfferingList[]> => {
    const response$ = _serviceOfferingsListDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<ServiceOfferingList> => {
    const response$ = _serviceOfferingsListDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: ServiceOfferingList):Promise<ServiceOfferingList> => {
    const response$ = _serviceOfferingsListDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: ServiceOfferingList):Promise<ServiceOfferingList> => {
    const response$ = _serviceOfferingsListDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _serviceOfferingsListDataService.deleteItem(id);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const getQuery = async (fieldName: string, operator: WhereFilterOp, value: string):Promise<ServiceOfferingList[]> => {
    const response$ = _serviceOfferingsListDataService.getQuery(fieldName, operator, value);
    const response: any = await firstValueFrom(response$)
    return response;
  };



  return {
    getAll,
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getQuery
  };
});
