import { createInjectable } from "ngxtension/create-injectable";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserAppointmentsDataService } from "./user-appointments-data.service";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { UserAppointment } from "app/core/services/data-services/user-appointments/user-appointment.model";

export const UserAppointmentsApiV2Service = createInjectable(() => {
  const _userAppointmentsDataService = inject(UserAppointmentsDataService);
  const loginUser = inject(FirebaseAuthV2Service).loginUser();
  
  const getAll = async ():Promise<UserAppointment[]> => {
    const response$ = _userAppointmentsDataService.getAll(loginUser.orgId);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getAllUserAppointments = async ():Promise<UserAppointment[]> => {
    const response$ = _userAppointmentsDataService.getQuery('userId', '==', loginUser.id);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const getItem = async (id):Promise<UserAppointment> => {
    const response$ = _userAppointmentsDataService.getItem(id);
    const response = await firstValueFrom(response$)
    return response;
  };

  const createItem = async (data: UserAppointment):Promise<UserAppointment> => {
    data.orgId = loginUser.orgId;
    const response$ = _userAppointmentsDataService.createItem(data);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };

  const updateItem = async (data: UserAppointment):Promise<UserAppointment> => {
    const response$ = _userAppointmentsDataService.updateItem(data);
    const response: any = await firstValueFrom(response$)
    return response;
  };

  const deleteItem = async (id: string):Promise<object> => {
    const response$ = _userAppointmentsDataService.deleteItem(id);
    const response: any = await firstValueFrom(response$)
    return response.data;
  };


  return {
    getAll,
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getAllUserAppointments
  };
});
