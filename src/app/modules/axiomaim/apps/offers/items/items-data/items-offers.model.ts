import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { Image } from 'app/core/models/image.model';

export class ItemsofferModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        category: string,
        name: string,
        description: string,
        tags: string[],
        sku: string | null,
        barcode: string | null,
        brand: string | null,
        vendor: string | null,
        stock: number,
        reserved: number,
        cost: number,
        basePrice: number,
        taxPercent: number,
        price: number,
        weight: number,
        thumbnail: string,
        images: string[],
        active: boolean,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.category = category;
            this.name = name;
            this.description = description;
            this.tags = tags;
            this.sku = sku;
            this.barcode = barcode;
            this.brand = brand;
            this.vendor = vendor;
            this.stock = stock;
            this.reserved = reserved;
            this.cost = cost;
            this.basePrice = basePrice;
            this.taxPercent = taxPercent;
            this.price = price;
            this.weight = weight;
            this.thumbnail = thumbnail;
            this.images = images;
            this.active = active;
    }
    public id: string;
    public orgId: string;
    public category: string;
    public name: string;
    public description: string;
    public tags: string[];
    public sku: string | null;
    public barcode: string | null;
    public brand: string | null;
    public vendor: string | null;
    public stock: number;
    public reserved: number;
    public cost: number;
    public basePrice: number;
    public taxPercent: number;
    public price: number;
    public weight: number;
    public thumbnail: string;
    public images: string[];
    public active: boolean;

    public static toDto(dto: ItemsOffer): ItemsOffer {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            category: dto.category ? dto.category : '',
            name: dto.name ? dto.name : '',
            description: dto.description ? dto.description : '',
            tags: dto.tags ? dto.tags : [],
            sku: dto.sku ? dto.sku : null,
            barcode: dto.barcode ? dto.barcode : null,
            brand: dto.brand ? dto.brand : null,
            vendor: dto.vendor ? dto.vendor : null,
            stock: dto.stock ? dto.stock : 0,
            reserved: dto.reserved ? dto.reserved : 0,
            cost: dto.cost ? dto.cost : 0,
            basePrice: dto.basePrice ? dto.basePrice : 0,
            taxPercent: dto.taxPercent ? dto.taxPercent : 0,
            price: dto.price ? dto.price : 0,
            weight: dto.weight ? dto.weight : 0,
            thumbnail: dto.thumbnail ? dto.thumbnail : '',
            images: dto.images ? dto.images : [],
            active: dto.active ? dto.active : true,
        };
    }

    public static emptyDto():ItemsOffer {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            category: '',
            name: '',
            description: '',
            tags: [],
            sku: null,
            barcode: null,
            brand: null,
            vendor: null,
            stock: 0,
            reserved: 0,
            cost: 0,
            basePrice: 0,
            taxPercent: 0,
            price: 0,
            weight: 0,
            thumbnail: '',
            images: [],
            active: true,
        }
    }
}

export interface ItemsOffer extends BaseDto {
    id: string;
    orgId: string;
    category: string;
    name: string;
    description: string;
    tags: string[];
    sku: string | null;
    barcode: string | null;
    brand: string | null;
    vendor: string | null;
    stock: number;
    reserved: number;
    cost: number;
    basePrice: number;
    taxPercent: number;
    price: number;
    weight: number;
    thumbnail: string;
    images: string[];
    active: boolean;
}

