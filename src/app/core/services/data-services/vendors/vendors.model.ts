import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class VendorModel {

    constructor(
        id: string,
        orgId: string,
        name: string,
        slug: string,
        email: string,
        phone: string,
        address: string,
        city: string,
        state: string,
        zip: string,
        country: string,
        website: string,
        contactPerson: string,
        notes: string,
        
        ) {
        this.id = id;
        this.orgId = orgId;
        this.name = name;
        this.slug = slug;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
        this.website = website;
        this.contactPerson = contactPerson;
        this.notes = notes;

    }

    public id: string;
    public orgId: string;
    public name: string;
    public slug: string;
    public email: string;
    public phone: string;
    public address: string;
    public city: string;
    public state: string;
    public zip: string;
    public country: string;
    public website: string;
    public contactPerson: string;
    public notes: string;



    public static emptyDto(): Vendor {
        return {
            id: uuidv4().toString(),
            orgId: null,
            name: '',
            slug: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            website: '',
            contactPerson: '',
            notes: '',
        }
    }

    public static toDto(dto: Vendor): Vendor {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : null,
                name: dto.name ? dto.name : '',
                slug: dto.slug ? dto.slug : '',
                email: dto.email ? dto.email : '',
                phone: dto.phone ? dto.phone : '',
                address: dto.address ? dto.address : '',
                city: dto.city ? dto.city : '',
                state: dto.state ? dto.state : '',
                zip: dto.zip ? dto.zip : '',
                country: dto.country ? dto.country : '',
                website: dto.website ? dto.website : '',
                contactPerson: dto.contactPerson ? dto.contactPerson : '',
                notes: dto.notes ? dto.notes : '',
            };
        }
    
}

export interface Vendor extends BaseDto {
    id: string;
    orgId: string;
    name: string;
    slug: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    website: string;
    contactPerson: string;
    notes: string;
}


