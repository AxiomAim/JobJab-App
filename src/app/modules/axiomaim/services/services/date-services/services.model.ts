import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class ServiceModel implements BaseDto {
    constructor(
        id: string,
        serviceOfferingId: string,
        serviceOfferingListId: string,
        type: string,
        name: string,
        description: string,
        icon: string,
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
            this.serviceOfferingId = serviceOfferingId;
            this.serviceOfferingListId = serviceOfferingListId;
            this.type = type;
            this.name = name;
            this.description = description;
            this.icon = icon;
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
    public serviceOfferingId: string;
    public serviceOfferingListId: string;
    public type: string;
    public name: string;
    public description: string;
    public icon: string;
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

    public static toDto(dto: Service): Service {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            serviceOfferingId: dto.serviceOfferingId ? dto.serviceOfferingId : '',
            serviceOfferingListId: dto.serviceOfferingListId ? dto.serviceOfferingListId : '',
            type: dto.type ? dto.type : '',
            name: dto.name ? dto.name : '',
            description: dto.description ? dto.description : '',
            icon: dto.icon ? dto.icon : '',
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

    public static emptyDto():Service {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            serviceOfferingId: '',
            serviceOfferingListId: '',
            type: '',
            name: '',
            description: '',
            icon: '',
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

export interface Service  extends BaseDto {
    id: string;
    serviceOfferingId: string;
    serviceOfferingListId: string;
    type: string,
    name: string;
    description: string;
    icon: string;
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

