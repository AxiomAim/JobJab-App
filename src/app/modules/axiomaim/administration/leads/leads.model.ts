import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class LeadModel implements BaseDto {
    constructor(
        id: string,
        type: string,
        name: string,
        description: string,
        price: number,
        priceType: string,
        priceMeasure: string,
        image: string,
        discount: number,
        cartCount: number,
        categoryId: number,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        ) {
            this.id = id;
            this.type = type;
            this.name = name;
            this.description = description;
            this.price = price;
            this.priceType = priceType;
            this.priceMeasure = priceMeasure;
            this.image = image;
            this.discount = discount;
            this.cartCount = cartCount;
            this.categoryId = categoryId;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
    }
    public id: string;
    public type: string;
    public name: string;
    public description: string;
    public price: number;
    public priceType: string;
    public priceMeasure: string;
    public image: string;
    public discount: number;
    public cartCount: number;
    public categoryId: number;
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    public static toDto(dto: Lead): Lead {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            type: dto.type ? dto.type : '',
            name: dto.name ? dto.name : '',
            description: dto.description ? dto.description : '',
            price: dto.price ? dto.price : 0,
            priceType: dto.priceType ? dto.priceType : '',
            priceMeasure: dto.priceMeasure ? dto.priceMeasure : '',
            image: dto.image ? dto.image : '',
            discount: dto.discount ? dto.discount : 0,
            cartCount: dto.cartCount ? dto.cartCount : 0,
            categoryId: dto.categoryId ? dto.categoryId : 0,
            created_at: dto.created_at ? dto.created_at : '',
            updated_at: dto.updated_at ? dto.updated_at : '',
            deleted_at: dto.deleted_at ? dto.deleted_at : '',
        };
    }

    public static emptyDto():Lead {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            type: '',
            name: '',
            description: '',
            price: 0,
            priceType: '',
            priceMeasure: '',
            image: '',
            discount: 0,
            cartCount: 0,
            categoryId: 0,
            created_at: date,
            updated_at: date,
            deleted_at: '',

        }
    }
}

export interface Lead  extends BaseDto {
    id: string;
    type: string,
    name: string;
    description: string;
    price: number;
    priceType: string;
    priceMeasure: string;
    image: string;
    discount: number;
    cartCount: number;
    categoryId: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;    
}

