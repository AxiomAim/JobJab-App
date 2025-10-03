import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class ServiceModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
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
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
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
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
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
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Service): Service {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
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
            createdAt: dto.createdAt ? dto.createdAt : '',
            updatedAt: dto.updatedAt ? dto.updatedAt : '',
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto():Service {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
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
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface Service  extends BaseDto {
    id: string;
    orgId: string;
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
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

