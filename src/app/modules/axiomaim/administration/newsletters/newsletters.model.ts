import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { Contact } from '../../apps/contacts/contacts.types';

export class NewsletterModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        contactId: string,
        contact: Contact,
        email: string,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.contactId = contactId;
            this.contact = contact;
            this.email = email;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public contactId: string;
    public contact: Contact;
    public email: string;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Newsletter): Newsletter {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            contactId: dto.contactId ? dto.contactId : '',
            contact: dto.contact ? dto.contact : null,
            email: dto.email ? dto.email : '',
            createdAt: dto.createdAt ? dto.createdAt : '',
            updatedAt: dto.updatedAt ? dto.updatedAt : '',
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto():Newsletter {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            contactId: '',
            contact: null,
            email: '',
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface Newsletter  extends BaseDto {
    id: string;
    orgId: string;
    contactId: string;
    contact: Contact;
    email: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

