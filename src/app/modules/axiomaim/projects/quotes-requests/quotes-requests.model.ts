import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class QuotesRequestModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        name: string,
        email: string,
        phone: string,
        description: string,
        address: string,
        image: string,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.name = name;
            this.email = email;
            this.phone = phone;
            this.description = description;
            this.address = address;
            this.image = image;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public name: string;
    public email: string;
    public phone: string;
    public description: string;
    public address: string;
    public image: string;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: QuotesRequest): QuotesRequest {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            name: dto.name ? dto.name : '',
            email: dto.email ? dto.email : '',
            phone: dto.phone ? dto.phone : '',
            description: dto.description ? dto.description : '',
            address: dto.address ? dto.address : '',
            image: dto.image ? dto.image : '',
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
            name: '',
            email: '',
            phone: '',
            description: '',
            address: '',
            image: '',
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface QuotesRequest extends BaseDto {
    id: string;
    orgId: string;
    name: string;
    email: string;
    phone: string;
    description: string;
    address: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

