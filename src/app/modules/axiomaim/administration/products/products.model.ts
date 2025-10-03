import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class ProductModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
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
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
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
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
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
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Product): Product {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
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
            createdAt: dto.createdAt ? dto.createdAt : '',
            updatedAt: dto.updatedAt ? dto.updatedAt : '',
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto():Product {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
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
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface Product  extends BaseDto {
    id: string;
    orgId: string;
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
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

