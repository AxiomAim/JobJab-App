import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { FirestoreService } from '../../auth-firebase/firestore.service';
import { SendEmailDto } from '../../models/send-email.model';

@Injectable(
    {
        providedIn: 'root',
    }
)
export class SendEmailDataService extends BaseDataService<SendEmailDto> {
    constructor(private firestore: FirestoreService) {
        super('send-email');
    }

    public getAll(): Observable<SendEmailDto[]> {
        return this.firestore.getAll<SendEmailDto>(this.baseCollection);
    }
    public getItem(id: string): Observable<SendEmailDto> {
        return this.firestore.getItem<SendEmailDto>(this.baseCollection, id);
    }

    public updateItem(data: Partial<SendEmailDto>): Observable<SendEmailDto> {
        return this.firestore.updateItem<SendEmailDto>(this.baseCollection, data.id, data);
    }
    
    public deleteItem(id: string): Observable<SendEmailDto> {
        return this.firestore.deleteItem(this.baseCollection, id);
    }

    public createItem(data: SendEmailDto, completed: boolean = false): Observable<SendEmailDto> {
        return this.firestore.createItem<SendEmailDto>(this.baseCollection, data);
    }


    // public bulkCreate(data: Partial<SendEmailDto[]>): Observable<void> {
    //     return this.firestore.bulkCreate<SendEmailDto>(this.baseCollection, data);
    // }

    // public bulkUpdate(data: Partial<SendEmailDto[]>): Observable<void> {
    //     return this.firestore.bulkUpdate<SendEmailDto>(this.baseCollection, data);
    // }

    // public removeDuplicateUsers(): Observable<void> {
    //     return this.firestore.removeDuplicateUsers(this.baseCollection);
    // }

}