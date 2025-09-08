import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'environments/environment';

export const encryptStorage = new EncryptStorage(environment.LOCAL_STORAGE_KEY, {
  storageType: 'sessionStorage',
});

const { hostname } = new URL(window.location.href);


@Injectable({
  providedIn: 'root',
})
export class PermissionV2Service {
  constructor(private http: HttpClient) {}

  // getPermissionBasedOnModule = (studyOId, moduleKey) => {
  //   return this.http.get('permission/get-permission/' + studyOId + '/' + moduleKey, httpOptions);
  // };

  // getPermissionModuleWise(studyOId, moduleKey) {
  //   return new Observable((observer) => {
  //     this.getPermissionBasedOnModule(studyOId, moduleKey).subscribe((res) => {
  //       if (res['data']) {
  //         let isEdit =
  //           res['data']?.study_delegation_role_user?.study_delegation_role?.delegation_role_permission?.can_update;
  //         let isDelete =
  //           res['data']?.study_delegation_role_user?.study_delegation_role?.delegation_role_permission?.can_delete;
  //         let isView =
  //           res['data']?.study_delegation_role_user?.study_delegation_role?.delegation_role_permission?.can_read;
  //         let isCreate =
  //           res['data']?.study_delegation_role_user?.study_delegation_role?.delegation_role_permission?.can_create;
  //         let isApprove =
  //           res['data']?.study_delegation_role_user?.study_delegation_role?.delegation_role_permission?.can_approve;
  //         let current_delegation_role =
  //           res['data']?.study_delegation_role_user?.study_delegation_role?.delegation_role?.name;
  //         let study_status_active = res['data']?.studyStatus;
  //         observer.next({
  //           isEdit,
  //           isDelete,
  //           isView,
  //           isCreate,
  //           isApprove,
  //           current_delegation_role,
  //           study_status_active,
  //         });
  //       }
  //     });
  //   });
  // }

  // confirmSubjectAppointment(data): Observable<any> {
  //   return this.http.post('confirm-appointment', data, httpOptions);
  // }

  // getLongTokenForConfirmAppointment(token): Observable<any> {
  //   return this.http.get('get-long-url/' + token, httpOptions);
  // }

  // getChildPermissionForParent(studyOId, moduleKey, delegation_role_id) {
  //   return this.http.get<GetOne<ChildPermissionForParent>>('permission/get-inner-permission/' + studyOId + '/' + moduleKey + '/' + delegation_role_id, httpOptions);
  // }
}
