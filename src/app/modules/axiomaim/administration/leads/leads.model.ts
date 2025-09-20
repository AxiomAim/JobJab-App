import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class LeadModel implements BaseDto {
    constructor(
            id: string,
            avatar?: string | null,
            status?: string | null,            
            background?: string | null,
            firstName?: string,
            lastName?: string,
            email?: string,
            country?: string,
            phone?: string,
            title?: string,
            company?: string,
            birthday?: string | null,
            address?: string | null,
            project?: string | null,
            notes?: {
                subject: string,
                note: string,
            }[],
            tags?: string[],
            created_at?: string,
            updated_at?: string,
            deleted_at?: string,
        ) {
            this.id = id;
            this.avatar = avatar;
            this.status = status;
            this.background = background;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.country = country;
            this.phone = phone;
            this.title = title;
            this.company = company;
            this.birthday = birthday;
            this.address = address;
            this.project = project;
            this.notes = notes;
            this.tags = tags;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
    }
    public id: string;
    public avatar?: string | null;
    public status?: string | null;
    public background?: string | null;
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public country?: string;
    public phone?: string;
    public title?: string;
    public company?: string;
    public birthday?: string | null;
    public address?: string | null;
    public project?: string | null;
    public notes?: {
        subject: string,
        note: string,
    }[];
    public tags?: string[];
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    public static toDto(dto: Lead): Lead {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            avatar: dto.avatar ? dto.avatar : null,
            status: dto.status ? dto.status : null,
            background: dto.background ? dto.background : null,
            firstName: dto.firstName ? dto.firstName : null,
            lastName: dto.lastName ? dto.lastName : null,
            email: dto.email ? dto.email : null,
            country: dto.country ? dto.country : null,
            phone: dto.phone ? dto.phone : null,
            title: dto.title ? dto.title : '',
            company: dto.company ? dto.company : '',
            birthday: dto.birthday ? dto.birthday : null,
            address: dto.address ? dto.address : null,
            project: dto.project ? dto.project : null,
            notes: dto.notes ? dto.notes : [{subject: 'Initial Note', note: ''}],
            tags: dto.tags ? dto.tags : [],
            created_at: dto.created_at ? dto.created_at : date,
            updated_at: dto.updated_at ? dto.updated_at : date,
            deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto():Lead {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            avatar: null,
            status: null,
            background: null,
            firstName: null,
            lastName: null,
            email: null,
            country: null, 
            phone: null, 
            title: '',
            company: '',
            birthday: null,
            address: null,
            project: null,
            notes: [{subject: 'Initial Note', note: ''}],
            tags: [],
            created_at: date,
            updated_at: date,
            deleted_at: null,

        }
    }
}

export interface Lead  extends BaseDto {
    id: string;
    avatar?: string | null;
    status?: string | null;
    background?: string | null;
    firstName: string;
    lastName: string;
    email?: string;
    country: string;
    phone: string;
    title?: string;
    company?: string;
    birthday?: string | null;
    address?: string | null;
    project?: string | null;
    notes?: {
        subject: string;
        note: string;
    }[];
    tags?: string[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

}

