import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class RequestModel {

    constructor(
        id: string,
        orgId: string,
        name: string,
        slug: string,
        notes: string,

        ) {
        this.id = id;
        this.orgId = orgId;
        this.name = name;
        this.slug = slug;
        this.notes = notes;

    }

    public id: string;
    public orgId: string;
    public name: string;
    public slug: string;
    public notes: string;


    public static emptyDto(): Request {
        return {
            id: uuidv4().toString(),
            orgId: null,
            name: '',
            slug: '',
            notes: '',
        }
    }

    public static toDto(dto: Request): Request {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : null,
                name: dto.name ? dto.name : '',
                slug: dto.slug ? dto.slug : '',
                notes: dto.notes ? dto.notes : '',
            };
        }
    
}

export interface Request extends BaseDto {
    id: string;
    orgId: string;
    name: string;
    slug: string;
    notes: string;
}


