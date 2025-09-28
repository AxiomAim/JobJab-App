import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { BillingCycle } from './billing-cycle.types';

export class SubscriptionModel implements BaseDto {
    constructor(
        id: string,
        name: string,
        description: string,
        price: number,
        priceType: string,
        priceMeasure: string,
        image: string,
        discount: number,
        billingCycle: BillingCycle,
        categoryId: number,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,    
        ) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.price = price;
            this.priceType = priceType;
            this.priceMeasure = priceMeasure;
            this.image = image;
            this.discount = discount;
            this.billingCycle = billingCycle;
            this.categoryId = categoryId;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
    }
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public priceType: string;
    public priceMeasure: string;
    public image: string;
    public discount: number;
    public billingCycle: BillingCycle;
    public categoryId: number;
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    public static toDto(dto: Subscription): Subscription {
        let date: any = new Date().toISOString();

        return {
        id: dto.id ? dto.id : '',
        name: dto.name ? dto.name : '',
        description: dto.description ? dto.description : '',
        price: dto.price ? dto.price : 0,
        priceType: dto.priceType ? dto.priceType : '',
        priceMeasure: dto.priceMeasure ? dto.priceMeasure : '',
        image: dto.image ? dto.image : '',
        discount: dto.discount ? dto.discount : 0,
        billingCycle: dto.billingCycle ? dto.billingCycle : {id: '', title: '', description: '', active: false},
        categoryId: dto.categoryId ? dto.categoryId : 0,
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
            price: 0,
            priceType: '',
            priceMeasure: '',
            image: '',
            discount: 0,
            billingCycle: {id: '', title: '', description: '', active: false},
            categoryId: 0,

        }
    }
}

export interface Subscription  extends BaseDto {
    id: string;
    name: string;
    description: string;
    option: Options[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;    
}

export interface Options  {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    discount: number;
    billingCycle: BillingCycle;
}
