import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { BillingCycle } from './billing-cycle.types';

export class SubscriptionModel implements BaseDto {
    constructor(
            id: string,
            orgId: string,
            name: string,
            description: string,
            option: Option[],
            createdAt?: string,
            updatedAt?: string,
            deletedAt?: string,    
        ) {
            this.id = id;
            this.orgId = orgId;
            this.name = name;
            this.description = description;
            this.option = option;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public name: string;
    public description: string;
    public option: Option[];
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Subscription): Subscription {
        let date: any = new Date().toISOString();

        return {
        id: dto.id ? dto.id : '',
        orgId: dto.orgId ? dto.orgId : '',
        name: dto.name ? dto.name : '',
        description: dto.description ? dto.description : '',
        option: dto.option ? dto.option : [],
        createdAt: dto.createdAt ? dto.createdAt : date,
        updatedAt: dto.updatedAt ? dto.updatedAt : date,
        deletedAt: dto.deletedAt ? dto.deletedAt : null,
        };
    }

    public static emptyDto():Subscription {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            name: '',
            description: '',
            option: [],
            createdAt: date,
            updatedAt: date,
            deletedAt: null,

        }
    }
}

export interface Subscription  extends BaseDto {
    id: string;
    orgId: string;
    name: string;
    description: string;
    option: Option[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

export interface Option  {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    discount: number;
    billingCycle: BillingCycle;
}
