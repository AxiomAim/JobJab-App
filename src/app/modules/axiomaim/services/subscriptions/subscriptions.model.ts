import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { BillingCycle } from './billing-cycle.types';

export class SubscriptionModel implements BaseDto {
    constructor(
            id: string,
            name: string,
            description: string,
            option: Option[],
            created_at?: string,
            updated_at?: string,
            deleted_at?: string,    
        ) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.option = option;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
    }
    public id: string;
    public name: string;
    public description: string;
    public option: Option[];
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    public static toDto(dto: Subscription): Subscription {
        let date: any = new Date().toISOString();

        return {
        id: dto.id ? dto.id : '',
        name: dto.name ? dto.name : '',
        description: dto.description ? dto.description : '',
        option: dto.option ? dto.option : [],
        created_at: dto.created_at ? dto.created_at : date,
        updated_at: dto.updated_at ? dto.updated_at : date,
        deleted_at: dto.deleted_at ? dto.deleted_at : null,
        };
    }

    public static emptyDto():Subscription {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            name: '',
            description: '',
            option: [],
            created_at: date,
            updated_at: date,
            deleted_at: null,

        }
    }
}

export interface Subscription  extends BaseDto {
    id: string;
    name: string;
    description: string;
    option: Option[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;    
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
