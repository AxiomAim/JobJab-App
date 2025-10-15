import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { Contact } from 'app/layout/common/quick-chat/quick-chat.types';

export class QuotesRequestModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        background: string,
        contactId: string,
        contact: Contact,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        description: string,
        address: string,
        image: string,
        house: boolean,
        driveway: boolean,
        walkway: boolean,
        fence: boolean,
        deck_patio: boolean,
        other: boolean,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.background = background;
            this.contactId = contactId;
            this.contact = contact;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phone = phone;
            this.description = description;
            this.address = address;
            this.image = image;
            this.house = house;
            this.driveway = driveway;
            this.walkway = walkway;
            this.fence = fence;
            this.deck_patio = deck_patio;
            this.other = other;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public background: string;
    public contactId: string;
    public contact: Contact;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone: string;
    public description: string;
    public address: string;
    public image: string;
    public house: boolean;
    public driveway: boolean;
    public walkway: boolean;
    public fence: boolean;
    public deck_patio: boolean;
    public other: boolean;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: QuotesRequest): QuotesRequest {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            background: dto.background ? dto.background : 'images/backgrounds/jobjab_quotes_requests.jpg',
            contactId: dto.contactId ? dto.contactId : '',
            contact: dto.contact ? dto.contact : null,
            firstName: dto.firstName ? dto.firstName : '',
            lastName: dto.lastName ? dto.lastName : '',
            email: dto.email ? dto.email : '',
            phone: dto.phone ? dto.phone : '',
            description: dto.description ? dto.description : '',
            address: dto.address ? dto.address : '',
            image: dto.image ? dto.image : '',
            house: dto.house ? dto.house : false,
            driveway: dto.driveway ? dto.driveway : false,
            walkway: dto.walkway ? dto.walkway : false,
            fence: dto.fence ? dto.fence : false,
            deck_patio: dto.deck_patio ? dto.deck_patio : false,
            other: dto.other ? dto.other : false,
            createdAt: dto.createdAt ? dto.createdAt : date,
            updatedAt: dto.updatedAt ? dto.updatedAt : date,
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto():QuotesRequest {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            background: 'images/backgrounds/jobjab_quotes_requests.jpg',
            contactId: '',
            contact: null,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            description: '',
            address: '',
            image: '',
            house: false,
            driveway: false,
            walkway: false,
            fence: false,
            deck_patio: false,
            other: false,
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface QuotesRequest extends BaseDto {
    id: string;
    orgId: string;
    background: string;
    contactId: string;
    contact: Contact;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    description: string;
    address: string;
    image: string;
    house: boolean;
    driveway: boolean;
    walkway: boolean;
    fence: boolean;
    deck_patio: boolean;
    other: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

