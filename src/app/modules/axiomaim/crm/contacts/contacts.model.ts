import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class ContactModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        type: string,
        firstName: string,
        lastName: string,
        company: string,
        displayName: string,
        address: string,
        lead: boolean,
        leadAt: string,
        customer: boolean,
        customerAt: string,
        touches: Touch[],
        actions: Action[],
        emails: {
            email: string;
            label: string;
        }[],
        phoneNumbers: {
            country: string;
            phoneNumber: string;
            label: string;
        }[],
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.type = type;
            this.firstName = firstName;
            this.lastName = lastName;
            this.company = company;
            this.displayName = displayName;
            this.address = address;
            this.lead = lead;
            this.leadAt = leadAt;
            this.customer = customer;
            this.customerAt = customerAt;
            this.touches = touches;
            this.actions = actions;
            this.emails = emails;
            this.phoneNumbers = phoneNumbers;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public type: string;
    public firstName: string;
    public lastName: string;
    public company: string;
    public displayName: string;
    public address: string;
    public lead: boolean;
    public leadAt: string;
    public customer: boolean;
    public customerAt: string;
    public touches: Touch[];
    public actions: Action[];
    public emails?: {
        email: string;
        label: string;
    }[];
    public phoneNumbers?: {
        country: string;
        phoneNumber: string;
        label: string;
    }[];
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Contact): Contact {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            type: dto.type ? dto.type : '',
            firstName: dto.firstName ? dto.firstName : '',
            lastName: dto.lastName ? dto.lastName : '',
            company: dto.company ? dto.company : '',
            displayName: dto.displayName ? dto.displayName : dto.firstName + ' ' + dto.lastName ,
            address: dto.address ? dto.address : '',
            lead: dto.lead ? dto.lead : false,
            leadAt: dto.leadAt ? dto.leadAt : '',
            customer: dto.customer ? dto.customer : false,
            customerAt: dto.customerAt ? dto.customerAt : '',
            touches: dto.touches ? dto.touches : [],
            actions: dto.actions ? dto.actions : [],
            emails: dto.emails ? dto.emails : [
                // { email: '', label: 'Work' }
            ],
            phoneNumbers: dto.phoneNumbers ? dto.phoneNumbers : [
                // { country: 'us', phoneNumber: '', label: 'Mobile' }
            ],
            createdAt: dto.createdAt ? dto.createdAt : '',
            updatedAt: dto.updatedAt ? dto.updatedAt : '',
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto():Contact {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            type: '',
            firstName: '',
            lastName: '',
            company: '',
            displayName: '',
            address: '',
            lead: false,
            leadAt: '',
            customer: false,
            customerAt: '',
            touches: [],
            actions: [],
            emails: [
                // { email: '', label: 'Work' }
            ],
            phoneNumbers: [
                // { country: 'us', phoneNumber: '', label: 'Mobile' }
            ],
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface Contact  extends BaseDto {
    id: string;
    orgId: string;
    type: string;
    firstName: string;
    lastName: string;
    company: string;
    displayName: string;
    address: string;
    lead: boolean;
    leadAt: string;
    customer: boolean;
    customerAt: string;
    touches: Touch[];
    actions: Action[];
    emails: {
        email: string;
        label: string;
    }[];
    phoneNumbers: {
        country: string;
        phoneNumber: string;
        label: string;
    }[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

export interface Country {
    id: string;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
}

export interface Touch {
    id: string;
    name: string;
    description: string;
    createAt: string;
    updateAt: string;
    completeAt: string;
}

export interface Action {
    id: string;
    name: string;
    description: string;
    createAt: string;
    updateAt: string;
    completeAt: string;
}
